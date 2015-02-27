var React = require('react'),
    Router = require('react-router'),
    moment = require('moment'),
    aapi = require('./lib/alonso-api'),
    myLib = {};    

myLib.React = React;
myLib.moment = moment;
myLib.aapi = aapi;
myLib.Router = Router;
myLib.components = {};

if (!window.myLib) {
  window.myLib = myLib;
}