'use strict';

module.exports = function(packageFile, whichdependencies) {
  var fs = require('fs');
  var packageJson = require(packageFile);
  var dependencies = whichdependencies || 'dependencies';

  if(packageJson[dependencies]) {
    packageJson.bundledDependencies = Object.keys(packageJson[dependencies]);

    fs.writeFile(packageFile, JSON.stringify(packageJson, null, 4), function(error) {
      if (error) {
        throw error;
      }
      console.log('Package.json updated with the following bundled dependencies:');
      console.log(packageJson.bundledDependencies);
    });
  } else {
    console.log('No dependencies found');
  }
};
