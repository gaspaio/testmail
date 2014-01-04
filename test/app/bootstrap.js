chai = require('chai');
expect = chai.expect;

path = require('path');


appGlobals = {};
appGlobals.basedir = path.resolve(__dirname, '..','..');
appGlobals.appdir = path.resolve(appGlobals.basedir, 'app');

process.env.NODE_ENV = 'test';

console.log("starting tests");
