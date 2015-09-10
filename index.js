'use strict';

module.exports = function(packageFile, whichDependencies) {
  var fs = require('fs');
  var packageJson = require(packageFile);

  var dependenciesAskedFor = whichDependencies || 'dependencies';
  var dependenciesToUse = [];
  var productionDependenciesKey = 'dependencies';
  var devDependenciesKey = 'devDependencies';
  var foundAnyToAdd = false;

  var bothDependencies = dependenciesAskedFor === "both";
  if (bothDependencies) {
    dependenciesToUse.push(productionDependenciesKey);
    dependenciesToUse.push(devDependenciesKey);
  } else {
    dependenciesToUse.push(dependenciesAskedFor);
  }

  console.log("Going to pick bundled dependencies from: " + dependenciesToUse.join(", "));

  packageJson.bundledDependencies = [];
  dependenciesToUse.forEach(function (dependencySection) {
    if (packageJson[dependencySection]) {
      foundAnyToAdd = true;
      var dependenciesFoundToAdd = Object.keys(packageJson[dependencySection]);
      dependenciesFoundToAdd.forEach(function(dependency) {
        packageJson.bundledDependencies.push(dependency);
      });
      console.log("bundledDependencies section updated with the following dependencies: ");
      console.log(dependenciesFoundToAdd);
    } else {
      console.log("No dependencies found in the " + dependencySection + " section of the package.json");
    }
  });

  if (foundAnyToAdd) {
    // only update it if we have anything to update.
    fs.writeFile(packageFile, JSON.stringify(packageJson, null, 4), function(error) {
      if (error) {
        throw error;
      }
      console.log("Successfully updated package.json with bundled dependencies.");
    });
  }
  else {
    console.log("Didn't find any bundled dependencies so we haven't touched package.json.");
  }
};
