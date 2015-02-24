'use strict';

//function to handle gapi initialization
var init = function() {
   //load plus api
  gapi.client.load('plus' , 'v1' , function() {
    gapi.isReady = true;
  });
}

window.init = init;

var React = require('React'),
    aapi = require('./components/alonso-api'),
    BlogList = require('./components/blog-list'),
    ActivityBox = require('./components/activity-box'),
    GoogleSignin = require('./components/google-signin');    
    
if (!window.React) {
  window.React = React;
}

React.render(<BlogList data={aapi.blogs.read()} /> , document.getElementById('blog-list'));

React.render(<ActivityBox data={aapi.blogs.read({
  offset : 0,
  limit : 3
})} /> , document.getElementById('activity-box'));

React.render(<GoogleSignin clientId='323720500806-3migkqarjv91vgdcq92o02a90bqe5kbs.apps.googleusercontent.com' scope='https://www.googleapis.com/auth/userinfo.email'/> , document.getElementById('google-signin'));