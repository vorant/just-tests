# just tests

## Description

This is odinary job for freelance market.
I was given a one file (`app/test.js`) and my job was to cover this file by unit tests.  But I received only one file without environment, so to run tests I had to set up environment. 

And I did following steps:
- added `package.json` for installing node packeges
- - install Karma, Jasmine and other dependencies
- added `bower.json` for installing frontend libraries
- - install AngularJs and their dependencies
- created empty Angular project
- wrote wrappers for tests `app/wrappersForTests.js`
- wrote tests `app/test.spec.js`
- made configuration for Karma
- run tests

## Getting Started

### Download project

```
git clone https://github.com/vorant/just-tests.git
cd just-tests
```

### install dependencies
```
 npm install
 bower install
```

### Run karma

```
   karma start karma.conf.js
```
