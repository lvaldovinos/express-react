'use strict';

var React = require('react');

var Header = React.createClass({
  render : function() {
    return (
      <div className="row" id="header-container">
        <div className="col-md-12">
          <h1 className="text-center">Alonso thoughts</h1>
          <p className="text-center lead">Happiness only real when shared</p>
        </div>
      </div>
    );
  }
});

module.exports = Header;