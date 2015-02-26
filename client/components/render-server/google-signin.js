var React = require('react');

  var GoogleSignin = React.createClass({
      handleClick : function(e) {
        e.preventDefault();
        alert('Click!')
      },
      render : function() {
        return (
          <div className="googleSignin">
            <button className="btn btn-default" onClick={this.handleClick}><i className="fa fa-google-plus fa-lg"></i>  Sign in</button>
          </div>
        );
      }
  });

module.exports = GoogleSignin;