(function(BlogPagination , ActivityBox , SignInOut , aapi , React) {
  'use strict';
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
                  <SignInOut clientId={'808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com'}
                             scope={'https://www.googleapis.com/auth/userinfo.email'} />
                </div>
              </div>
              <div className="col-md-12 col-sm-8">
                <div id="activity-box"> 
                  <ActivityBox data={aapi.blogs.read({
                    offset : 0,
                    limit : 3
                  })} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-md-offset-1 .col-sm-12" id="right-container">
            <div id="blog-pagination">
              <BlogPagination data={aapi.blogs.read()}
                              limit={1} /> 
            </div>
          </div>
        </div>
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Body = Body;
  
}(myLib.components.BlogPagination , myLib.components.ActivityBox , myLib.components.SignInOut , myLib.aapi , myLib.React));