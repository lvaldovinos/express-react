(function(React) {
  'use strict';
  var GoogleSignout = React.createClass({
      handleClick : function(e) {
        this.props.onClick(e);
      },
      render : function() {
        return (
          <div className="googleSignout">
            <button className="btn btn-default" onClick={this.handleClick}><i className="fa fa-sign-out fa-lg"></i>  Sign out</button>
          </div>
        );
      }
  });
  
 if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.GoogleSignout = GoogleSignout;
}(myLib.React));