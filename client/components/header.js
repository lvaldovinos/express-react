(function(React) {
  'use strict';
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
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Header = Header;
}(myLib.React));