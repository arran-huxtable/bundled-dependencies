# BundledDependencies

Auto generate the bundled dependencies section of your package.json, so that NPM pack and the like can pick up that section on the fly.

Useful for deciding between having your bundled dependencies use production dependencies, development dependencies or both.

Forked from https://github.com/LudwigHoff/bundled-dependencies

## Install

```
npm install bundled-dependencies-autogeneration
```

## Usage


Takes a package.json file, looks at the dependencies object and adds each item
 it to the bundledDependencies array and writes it back to disk.

To use it I just create a file containing something like:

```js
require('bundled-dependencies-autogeneration')('./package.json');                    // production dependencies (dependencies)
require('bundled-dependencies-autogeneration')('./package.json', 'dependencies');    // production dependencies (dependencies)
require('bundled-dependencies-autogeneration')('./package.json', 'devDependencies'); // development dependencies (devDependencies)
require('bundled-dependencies-autogeneration')('./package.json', 'both');            // both sets of dependencies (dependencies + devDependencies)

```

Which will then write that package.json back to disk with your specified set of dependencies in the bundledDependencies section.

This is then just called as part of a script that sets up that section of the package.json ready for something else to use it, i.e npm pack.
