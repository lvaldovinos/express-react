(function(React , GoogleSignin , GoogleSignout , aapi , gapi) {
  'use strict';
  var SignInOut = React.createClass({
    getInitialState : function() {
      return {
        aux : aapi.tokens.isAlonsoLoggedIn()
      };
    },
    onSignIn : function(e) {
      e.preventDefault();
      if (gapi.isReady) {
        gapi
          .auth
          .authorize({
            client_id : this.props.clientId,
            immediate : false,
            scope : this.props.scope
          }, function(authResult) {
            console.log(authResult);
            if (authResult.status['signed_in']) {
              //create new token on alonso.thoughtapi
              aapi
                .tokens
                .create(authResult['token_type'] + ' ' + authResult['access_token'] , function(res) {
                  if (res.code === 200) {
                    this.setState({
                      aux : aapi.tokens.isAlonsoLoggedIn()
                    });
                  }
                }.bind(this));
            }
          }.bind(this));
      }
      else {
        console.log('gapi is not ready to be used yet!');
      }
    },
    onSignOut : function(e) {
      e.preventDefault();
      if (gapi.isReady) {
        aapi
          .tokens
          .delete(function(res) {
            if (res.code === 200) {
              this.setState({
                aux : aapi.tokens.isAlonsoLoggedIn()
              });
            }
          }.bind(this));
      }
      else {
        console.log('gapi is not ready to be used yet!');
      }
    },
    render : function() {
      var button = <GoogleSignin onClick={this.onSignIn}/>;
      if (this.state.aux) {
        button = <GoogleSignout onClick={this.onSignOut}/>;
      }
      return (
        <div id="signin-out" className="center-block">
          {button}
        </div>
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.SignInOut = SignInOut;
  
}(myLib.React , myLib.components.GoogleSignin , myLib.components.GoogleSignout , myLib.aapi , gapi));