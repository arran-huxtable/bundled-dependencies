'use strict';

module.exports = function(packageFile, whichDeps) {
  var fs = require('fs');
  var pkg = require(packageFile);
  var deps = whichDeps || 'dependencies';

  if(pkg[deps]) {
    pkg.bundledDependencies = Object.keys(pkg[deps]);

    fs.writeFile(packageFile, JSON.stringify(pkg, null, 4), function(error) {
      if (error) {
        throw error;
      }
      console.log('Package.json updated with the following bundled dependencies:');
      console.log(pkg.bundledDependencies);
    });
  } else {
    console.log('No dependencies found');
  }
};
