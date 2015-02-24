(function(React , moment , aapi) {
  var ShortBlog = React.createClass({displayName: "ShortBlog",
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
      //shorten body..
      return (
        React.createElement("div", {className: "shortBlog"}, 
          React.createElement("div", null, 
            React.createElement("h5", null, name), 
            React.createElement("em", null, createdDate)
          ), 
          React.createElement("div", null, 
            React.createElement("small", null, 
              React.createElement("span", {dangerouslySetInnerHTML: {__html : body}})
            )
          )
        )
      );
    }
  });
  //blogs activity
  var BlogActivity = React.createClass({displayName: "BlogActivity",
    render : function() {
      var shortenBlogs = this.props.data.map(function(blog) {
        return (
          React.createElement(ShortBlog, {name: blog.name, createdDate: blog.createdDate}, 
            blog.shortBody
          )
        );
      });
      return (
        React.createElement("div", {className: "blogActivity"}, 
          shortenBlogs.slice(0 , 3)
        )
      );
    }
  });
  //activity box, that shows recent blogs and social activity
  var ActivityBox = React.createClass({displayName: "ActivityBox",
    render : function() {
      return (
        React.createElement("div", {className: "activityBox"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-12 col-sm-12"}, 
              React.createElement("h3", null, "Recent Activity")
            ), 
            React.createElement("div", {className: "col-md-12 col-sm-6"}, 
              React.createElement("h4", null, "Last posts"), 
              React.createElement(BlogActivity, {data: this.props.data})
            ), 
            React.createElement("div", {className: "col-md-12 col-sm-6"}, 
              React.createElement("h4", null, "Social Activity"), 
              React.createElement("p", null, "To be developed")
            )
          )
        )
      );
    }
  });
  
  React.render( React.createElement(ActivityBox, {data: aapi.blogs.read({
    offset : 0,
    limit : 3
  })}) , document.getElementById('activity-box'))
}(window.myLib.React , window.myLib.moment , window.myLib.aapi));
'use strict';

(function(React , moment , aapi) {
  var Blog = React.createClass({displayName: "Blog",
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
        
      return (
        React.createElement("div", {className: "blog"}, 
          React.createElement("div", null, 
            React.createElement("h2", null, name), 
            React.createElement("i", null, createdDate), 
            React.createElement("div", null, 
              React.createElement("span", {dangerouslySetInnerHTML: {__html: body}})
            )
          )
        )
      );
    }
  });
  //BlogList react class
  var BlogList = React.createClass({displayName: "BlogList",
    render : function() {
      var blogNodes = this.props.data.map(function(blog) {
        return (
          React.createElement(Blog, {name: blog.name, createdDate: blog.createdDate}, 
            blog.body
          )
        );
      });
      return (
        React.createElement("div", {className: "blogList"}, 
          blogNodes
        )
      );
    }
  });
  
  React.render(React.createElement(BlogList, {data: aapi.blogs.read()}) , document.getElementById('blog-list')); 
  
}(window.myLib.React , window.myLib.moment , window.myLib.aapi));
(function(React , gapi) {
  var GoogleSignin = React.createClass({displayName: "GoogleSignin",
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
          React.createElement("div", {className: "googleSignin"}, 
            React.createElement("button", {className: "btn btn-default", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-google-plus"}), "  Sign in")
          )
        );
      }
  });
  
  React.render(React.createElement(GoogleSignin, {clientId: "808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/userinfo.email"}) , document.getElementById('google-signin'));
  
}(window.myLib.React , window.gapi));