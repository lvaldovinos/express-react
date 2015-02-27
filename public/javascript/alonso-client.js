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
            React.createElement("div", {className: "blog-date"}, 
              React.createElement("i", null, createdDate)
            )
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
            React.createElement("div", {className: "blog-date"}, 
              React.createElement("i", null, createdDate)
            ), 
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
  
  var Previous = React.createClass({displayName: "Previous",
    handleClick : function(e) {
      e.preventDefault();
      this.props.onClick();
    },
    render : function() {
      var className = this.props.className + ' pull-left';
      return (
        React.createElement("li", {className: className}, React.createElement("a", {href: "#", onClick: this.handleClick}, "Previous"))
      );
    }
  });
  
  var Next = React.createClass({displayName: "Next",
    handleClick : function(e) {
      e.preventDefault();
      this.props.onClick();
    },
    render : function() {
      var className = this.props.className + ' pull-right';
      return (
        React.createElement("li", {className: className}, React.createElement("a", {href: "#", onClick: this.handleClick}, "Next"))
      );
    }
  });
  
  var Pager = React.createClass({displayName: "Pager",
    render : function() {
      var previousEl = React.createElement(Previous, {onClick: this.props.onPrevious, className: "show"}),
          nextEl = React.createElement(Next, {onClick: this.props.onNext, className: "show"});
      switch (this.props.index) {
        case 1:
          previousEl = React.createElement(Previous, {onClick: this.props.onPrevious, className: "hidden"});
        break;
        case this.props.totalPages:
          nextEl = React.createElement(Next, {onClick: this.props.onNext, className: "hidden"});
        break;
      }
      console.log('Page: ' + this.props.index);
      return (
        React.createElement("div", {className: "blogpagination-pager"}, 
          React.createElement("nav", null, 
            React.createElement("ul", {className: "pager"}, 
              previousEl, 
              nextEl
            )
          )
        )
      );
    }
  });
  
  var BlogPagination = React.createClass({displayName: "BlogPagination",
    showPage : function(pageIndex) {
      var aux = 0,
          start = 0,
          end = 0;
      if (pageIndex > 1) {
        aux = pageIndex - 1;
      }
      start = this.props.limit * aux;
      end = start + this.props.limit;
      return this.props.data.slice(start , end);
    },
    getInitialState : function() {
      return {
        pageIndex : 1
      };
    },
    onPrevious : function() {
      console.log('previous page: ' + (this.state.pageIndex - 1));
      this.setState({
        pageIndex : this.state.pageIndex - 1
      });
    },
    onNext : function() {
      console.log('next page: ' + (this.state.pageIndex + 1));
      this.setState({
        pageIndex : this.state.pageIndex + 1
      });
    },
    getTotalPages : function() {
      var pages = this.props.data.length/this.props.limit,
          roundedPages = (pages > Math.round(pages)) ? Math.round(pages) + 1 : Math.round(pages); 
      return roundedPages;
    },
    render : function() {
      var totalPages = this.getTotalPages();
      return (
        React.createElement("div", {className: "blogPagination"}, 
          React.createElement(Pager, {index: this.state.pageIndex, totalPages: totalPages, onPrevious: this.onPrevious, onNext: this.onNext}), 
          React.createElement(BlogList, {data: this.showPage(this.state.pageIndex)}), 
          React.createElement(Pager, {index: this.state.pageIndex, totalPages: totalPages, onPrevious: this.onPrevious, onNext: this.onNext})
        )
      );
    }
  });
  
  React.render(React.createElement(BlogPagination, {data: aapi.blogs.read(), limit: 1}) , document.getElementById('blog-pagination')); 
  
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
            React.createElement("button", {className: "btn btn-default", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-google-plus fa-lg"}), "  Sign in")
          )
        );
      }
  });
  
  React.render(React.createElement(GoogleSignin, {clientId: "808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/userinfo.email"}) , document.getElementById('google-signin'));
  
}(window.myLib.React , window.gapi));