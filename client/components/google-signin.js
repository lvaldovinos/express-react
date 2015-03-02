(function(React , gapi , aapi) {
  'use strict';
  var GoogleSignin = React.createClass({
      handleClick : function(e) {
        if (gapi.isReady) {
          gapi
            .auth
            .authorize({
              client_id : this.props.clientId,
              immediate : false,
              scope : this.props.scope
            } , function(authResult) {
              console.log(authResult);
              if (authResult.status['signed_in']) {
                //create new token on alonso.thoughtapi
                aapi
                  .tokens
                  .create(authResult['token_type'] + ' ' + authResult['access_token'] , function(res) {
                    console.log(res);
                  });
              }
            });
        }
        else {
          console.log('gapi is not ready to be used yet!');
        }
      },
      render : function() {
        return (
          <div className="googleSignin">
            <button className="btn btn-default" onClick={this.handleClick}><i className="fa fa-google-plus fa-lg"></i>  Sign in</button>
          </div>
        );
      }
  });
  
  //React.render(<GoogleSignin clientId='808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com' scope='https://www.googleapis.com/auth/userinfo.email'/> , document.getElementById('google-signin'));
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.GoogleSignin = GoogleSignin;
}(myLib.React , gapi , myLib.aapi));