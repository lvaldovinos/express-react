(function(React , moment , aapi) {
  var ShortBlog = React.createClass({
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
      //shorten body..
      return (
        <div className="shortBlog">
          <div>
            <h5>{name}</h5>
            <em>{createdDate}</em>
          </div>
          <div>
            <small>
              <span dangerouslySetInnerHTML={{__html : body}} />
            </small>
          </div>
        </div>
      );
    }
  });
  //blogs activity
  var BlogActivity = React.createClass({
    render : function() {
      var shortenBlogs = this.props.data.map(function(blog) {
        return (
          <ShortBlog name={blog.name} createdDate={blog.createdDate}>
            {blog.shortBody}
          </ShortBlog>
        );
      });
      return (
        <div className="blogActivity">
          {shortenBlogs.slice(0 , 3)}
        </div>
      );
    }
  });
  //activity box, that shows recent blogs and social activity
  var ActivityBox = React.createClass({
    render : function() {
      return (
        <div className="activityBox">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <h3>Recent Activity</h3>
            </div>
            <div className="col-md-12 col-sm-6">
              <h4>Last posts</h4>
              <BlogActivity data={this.props.data}/>
            </div>
            <div className="col-md-12 col-sm-6">
              <h4>Social Activity</h4>
              <p>To be developed</p>
            </div>
          </div>
        </div>
      );
    }
  });
  
  React.render( <ActivityBox data={aapi.blogs.read({
    offset : 0,
    limit : 3
  })} /> , document.getElementById('activity-box'))
}(window.myLib.React , window.myLib.moment , window.myLib.aapi));
'use strict';

(function(React , moment , aapi) {
  var Blog = React.createClass({
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
        
      return (
        <div className="blog">
          <div>
            <h2>{name}</h2>
            <i>{createdDate}</i>
            <div>
              <span dangerouslySetInnerHTML={{__html: body}} />
            </div>
          </div>
        </div>
      );
    }
  });
  //BlogList react class
  var BlogList = React.createClass({
    render : function() {
      var blogNodes = this.props.data.map(function(blog) {
        return (
          <Blog name={blog.name} createdDate={blog.createdDate}>
            {blog.body}
          </Blog>
        );
      });
      return (
        <div className="blogList">
          {blogNodes}
        </div>
      );
    }
  });
  
  React.render(<BlogList data={aapi.blogs.read()} /> , document.getElementById('blog-list')); 
  
}(window.myLib.React , window.myLib.moment , window.myLib.aapi));
(function(React , gapi) {
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
            });
        }
        else {
          console.log('gapi is not ready to be used yet!');
        }
      },
      render : function() {
        return (
          <div className="googleSignin">
            <button className="btn btn-default" onClick={this.handleClick}><i className="fa fa-google-plus"></i>  Sign in</button>
          </div>
        );
      }
  });
  
  React.render(<GoogleSignin clientId='808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com' scope='https://www.googleapis.com/auth/userinfo.email'/> , document.getElementById('google-signin'));
  
}(window.myLib.React , window.gapi));