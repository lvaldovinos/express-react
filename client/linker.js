var React = require('React'),
    moment = require('moment'),
    aapi = require('./lib/alonso-api'),
    myLib = {};    

myLib.React = React;
myLib.moment = moment;
myLib.aapi = aapi;
 
if (!window.myLib) {
  window.myLib = myLib;
}