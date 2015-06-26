# BundledDependencies

Auto generate your bundledDependencies: either prod or dev deps

Forked from https://github.com/simonmcmanus/bundled-dependencies

## Install

```
npm install bundled-dependencies-either
```

## Usage


Takes a package.json file, looks at the dependencies object and adds each item
 it to the bundledDependencies array.

To use it I just create a file containing:

```js
require('bundled-dependencies-either')('./package.json');                    //dependencies
require('bundled-dependencies-either')('./package.json', 'dependencies');    //dependencies
require('bundled-dependencies-either')('./package.json', 'devDependencies'); //devDependencies

```

I then call that file from my CI, run my tests, assuming the tests pass then run NPM pack and all the dependencies will be included in the generated package file.
