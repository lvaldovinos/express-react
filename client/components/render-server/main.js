'use strict';

var Header = require('./header'),
    Body = require('./body'),
    Footer = require('./footer'),
    React = require('react');
 
var MainPage = React.createClass({
  render : function() {
    return (
      <div id="main">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
});

module.exports = MainPage; 