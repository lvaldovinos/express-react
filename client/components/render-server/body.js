'use strict';

var BlogPagination = require('./blog-pagination'),
    ActivityBox = require('./activity-box'),
    GoogleSignin = require('./google-signin'),
    aapi = require('./../../lib/alonso-api'),
    React = require('react');
    
var Body = React.createClass({
  render : function() {
    return (
      <div className="row" id="body-container">
        <div className="col-md-4 .col-sm-12" id="left-container">
          <div className="row">
            <div className="col-md-10 col-sm-4 col-md-offset-1">
              <div id="personal-image" className="center-block">
                <img src="images/6406682.jpg" className="img-responsive img-circle" alt="Alonso @ The Blowhole"/>
              </div>
              <div id="google-signin" className="center-block">
                <GoogleSignin clientId={'808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com'}
                              scope={'https://www.googleapis.com/auth/userinfo.email'} />
              </div>
            </div>
            <div className="col-md-12 col-sm-8">
              <div id="activity-box"> 
                <ActivityBox data={this.props.data.slice(0 , 3)} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-md-offset-1 .col-sm-12" id="right-container">
          <div id="blog-pagination">
            <BlogPagination data={this.props.data}
                            limit={1} /> 
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Body;