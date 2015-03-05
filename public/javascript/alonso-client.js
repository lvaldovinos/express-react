(function(React , moment , aapi , Link) {
  'use strict';
  var ShortBlog = React.createClass({displayName: "ShortBlog",
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
      //shorten body..
      return (
        React.createElement("div", {className: "shortBlog clearfix"}, 
          React.createElement("h5", null, name), 
          React.createElement("div", {className: "clearfix"}, 
            React.createElement("div", {className: "blog-date pull-left"}, 
              React.createElement("i", null, createdDate)
            )
          ), 
          React.createElement("small", null, 
            React.createElement("span", {dangerouslySetInnerHTML: {__html : body}})
          ), 
          React.createElement("div", {className: "pull-right"}, 
            React.createElement(Link, {to: "blog", params: {id : this.props.id}}, "View full page")
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
          React.createElement(ShortBlog, {name: blog.name, createdDate: blog.createdDate, id: blog._id, key: blog._id}, 
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
  
  /*React.render( <ActivityBox data={aapi.blogs.read({
    offset : 0,
    limit : 3
  })} /> , document.getElementById('activity-box'))*/
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.ActivityBox = ActivityBox;
}(myLib.React , myLib.moment , myLib.aapi , myLib.Router.Link));
(function(React , moment , Link) {
  'use strict';
  var Blog = React.createClass({displayName: "Blog",
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
        
      return (
        React.createElement("div", {className: "blog"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("h2", null, name)
            ), 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "blog-date pull-left"}, 
                React.createElement("i", null, createdDate)
              ), 
              React.createElement("div", {className: "pull-right"}, 
                React.createElement(Link, {to: "blog", params: {id : this.props.id}}, "View full page")
              )
            ), 
            React.createElement("div", {className: "row"}, 
              React.createElement("span", {dangerouslySetInnerHTML: {__html: body}})
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
          React.createElement(Blog, {name: blog.name, createdDate: blog.createdDate, id: blog._id, key: blog._id}, 
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
      if (this.props.totalPages === 1) {
        nextEl = React.createElement(Next, {onClick: this.props.onNext, className: "hidden"});
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
  
  //React.render(<BlogPagination data={aapi.blogs.read()} limit={1} /> , document.getElementById('blog-pagination')); 
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.BlogPagination = BlogPagination;
  
}(myLib.React , myLib.moment , myLib.Router.Link));
(function(React) {
  'use strict';
  var Footer = React.createClass({displayName: "Footer",
    render : function() {
      return (
        React.createElement("div", {id: "footer-container"}, 
          React.createElement("div", {className: "row", id: "footer-info"}, 
            React.createElement("div", {className: "col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1 col-xm-12"}, 
              React.createElement("h4", {className: "text-left"}, "Let's touch base"), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0"}, 
                  React.createElement("i", {className: "fa fa-github fa-2x"})
                ), 
                React.createElement("div", {className: "col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1"}, 
                  React.createElement("a", {href: "https://github.com/lvaldovinos"}, " lvaldovinos ")
                )
              ), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0"}, 
                  React.createElement("i", {className: "fa fa-linkedin fa-2x"})
                ), 
                React.createElement("div", {className: "col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-6 col-xs-offset-1"}, 
                  React.createElement("a", {href: "https://www.linkedin.com/profile/view?id=280404993&trk=nav_responsive_tab_profile_pic"}, " Luis Valdovinos ")
                )
              ), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0"}, 
                  React.createElement("i", {className: "fa fa-stack-overflow fa-2x"})
                ), 
                React.createElement("div", {className: "col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1"}, 
                  React.createElement("a", {href: "http://stackoverflow.com/users/3773628/lvaldovinos"}, " lvaldovinos ")
                )
              ), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0"}, 
                  React.createElement("i", {className: "fa fa-twitter fa-2x"})
                ), 
                React.createElement("div", {className: "col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1"}, 
                  React.createElement("a", {href: "https://twitter.com/alonsovalencia_?lang=en"}, " alonsovalecnia_ ")
                )
              ), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-9 col-md-offset-2  col-sm-9 col-sm-offset-2 col-xs-8 col-xs-offset-4"}, 
                  React.createElement("a", {href: "https://www.npmjs.com/~lvaldovinos"}, " npm profile ")
                )
              )
            ), 
            React.createElement("div", {className: "col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1 col-xm-12"}, 
              React.createElement("h4", {className: "text-left"}, "Current company"), 
              React.createElement("h5", {className: "text-left"}, React.createElement("a", {href: "http://www.unosquare.com"}, "Unosquare")), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0"}, 
                  React.createElement("i", {className: "fa fa-globe fa-2x"})
                ), 
                React.createElement("div", {className: "col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-7 col-xs-offset-1"}, 
                  React.createElement("address", null, 
                    React.createElement("strong", null, "Guadalajara , Mexico"), 
                    React.createElement("div", null, "Av. Américas 1536 1A"), 
                    React.createElement("div", null, "Col. Country Club"), 
                    React.createElement("div", null, "C.P. 44637"), 
                    React.createElement("div", null, "Jalisco, México"), 
                    React.createElement("div", {id: "company-phone"}, 
                      React.createElement("span", null, "+52 (33) 3839-1855")
                    )
                  )
                )
              )
            )
          ), 
          React.createElement("div", {className: "row", id: "footer-email"}, 
            React.createElement("div", {className: "col-md-12"}, 
              React.createElement("p", {className: "text-center"}, 
                React.createElement("i", {className: "fa fa-envelope fa-lg"}), 
                React.createElement("a", {href: "mailto:lastkiss115@gmail.com"}, "  Luis Alonso Valdovinos Valencia")
              )
            )
          )
        )
      );
    }
  });
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Footer = Footer;
}(myLib.React));
(function(React) {
  'use strict';
  var GoogleSignin = React.createClass({displayName: "GoogleSignin",
      handleClick : function(e) {
        this.props.onClick(e);
      },
      render : function() {
        return (
          React.createElement("div", {className: "googleSignin"}, 
            React.createElement("button", {className: "btn btn-default", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-google-plus fa-lg"}), "  Sign in")
          )
        );
      }
  });
  
  //React.render(<GoogleSignin clientId='808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com' scope='https://www.googleapis.com/auth/userinfo.email'/> , document.getElementById('google-signin'));
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.GoogleSignin = GoogleSignin;
}(myLib.React));
(function(React) {
  'use strict';
  var GoogleSignout = React.createClass({displayName: "GoogleSignout",
      handleClick : function(e) {
        this.props.onClick(e);
      },
      render : function() {
        return (
          React.createElement("div", {className: "googleSignout"}, 
            React.createElement("button", {className: "btn btn-default", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-sign-out fa-lg"}), "  Sign out")
          )
        );
      }
  });
  
 if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.GoogleSignout = GoogleSignout;
}(myLib.React));
(function(React) {
  'use strict';
  var Header = React.createClass({displayName: "Header",
    render : function() {
      return (
        React.createElement("div", {className: "row", id: "header-container"}, 
          React.createElement("div", {className: "col-md-12"}, 
            React.createElement("h1", {className: "text-center"}, "Alonso thoughts"), 
            React.createElement("p", {className: "text-center lead"}, "Happiness only real when shared")
          )
        )
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Header = Header;
}(myLib.React));
(function(React , Link) {
  'use strict';
  var NewBlogButton = React.createClass({displayName: "NewBlogButton",
    render : function() {
      return (
        React.createElement(Link, {to: "new", className: "btn btn-success"}, "New Blog")
      );
    }
  });
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.NewBlogButton = NewBlogButton;
}(myLib.React , myLib.Router.Link));
(function(React , GoogleSignin , GoogleSignout , NewBlogButton , aapi , gapi) {
  'use strict';
  var SignInOut = React.createClass({displayName: "SignInOut",
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
                .create(authResult['token_type'] + ' ' + authResult['access_token'] , function(err , res) {
                  if (err) throw err;
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
          .delete(function(err , res) {
            if (err) throw err;
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
      var button = React.createElement(GoogleSignin, {onClick: this.onSignIn});
      if (this.state.aux) {
        button = (
          React.createElement("div", null, 
            React.createElement(GoogleSignout, {onClick: this.onSignOut}), 
            React.createElement(NewBlogButton, null)
          )
        );
      }
      return (
        React.createElement("div", {id: "signin-out", className: "center-block"}, 
          button
        )
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.SignInOut = SignInOut;
  
}(myLib.React , myLib.components.GoogleSignin , myLib.components.GoogleSignout , myLib.components.NewBlogButton , myLib.aapi , gapi));
(function(React , aapi) {
  'use strict';
  var UpdateDelete = React.createClass({displayName: "UpdateDelete",
    getInitialState : function() {
      return {
        aux : aapi.tokens.isAlonsoLoggedIn()
      };
    },
    componentDidMount : function() {
      this.setState({
        aux : aapi.tokens.isAlonsoLoggedIn()
      });
    },
    onEdit : function(e) {
      console.log('Edit!!');
    },
    onDelete : function(e) {
      console.log('Delete!');
    },
    render : function() {
      var klass = 'hidden';
      if (this.state.aux) {
        klass = 'show';
      }
      return (
        React.createElement("div", {id: "update-delete", className: klass}, 
          React.createElement("i", {className: "fa fa-pencil-square-o fa-2x", onClick: this.onEdit}), 
          React.createElement("i", {className: "fa fa-times fa-2x", onClick: this.onDelete})
        )
      );
    }
  });
  
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.UpdateDelete = UpdateDelete;
}(myLib.React , myLib.aapi));
(function(BlogPagination , ActivityBox , SignInOut , aapi , React) {
  'use strict';
  var Body = React.createClass({displayName: "Body",
    getInitialState : function() {
      return {
        data : []
      };
    },
    componentDidMount : function() {
      aapi
        .blogs
        .read(function(err , res) {
          if (err) throw err;
          if (res.code === 200) {
            this.setState({
              data : res.data
            })
          }
        }.bind(this));
    },
    render : function() {
      return (
        React.createElement("div", {className: "row", id: "body-container"}, 
          React.createElement("div", {className: "col-md-4 .col-sm-12", id: "left-container"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-md-10 col-sm-4 col-md-offset-1"}, 
                React.createElement("div", {id: "personal-image", className: "center-block"}, 
                  React.createElement("img", {src: "images/6406682.jpg", className: "img-responsive img-circle", alt: "Alonso @ The Blowhole"})
                ), 
                React.createElement("div", {id: "google-signin", className: "center-block"}, 
                  React.createElement(SignInOut, {clientId: '808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com', 
                             scope: 'https://www.googleapis.com/auth/userinfo.email'})
                )
              ), 
              React.createElement("div", {className: "col-md-12 col-sm-8"}, 
                React.createElement("div", {id: "activity-box"}, 
                  React.createElement(ActivityBox, {data: this.state.data.slice(0 , 3)})
                )
              )
            )
          ), 
          React.createElement("div", {className: "col-md-7 col-md-offset-1 .col-sm-12", id: "right-container"}, 
            React.createElement("div", {id: "blog-pagination"}, 
              React.createElement(BlogPagination, {data: this.state.data, 
                              limit: 1})
            )
          )
        )
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Body = Body;
  
}(myLib.components.BlogPagination , myLib.components.ActivityBox , myLib.components.SignInOut , myLib.aapi , myLib.React));
(function(React , Router , aapi , Link , moment , UpdateDelete) {
  'use strict';
  var Blog = React.createClass({displayName: "Blog",
    mixins : [Router.State],
    getInitialState : function() {
      return {
        data : {}
      };
    },
    componentDidMount : function() {
      aapi
        .blogs
        .readById(this.getParams().id , function(err , res) {
          if (err) throw err;
          if (res.code === 200) {            
            this.setState({
              data : res.data
            });
          }
        }.bind(this));
    },
    render : function() {
      var createdDate = moment(this.state.data.createdDate).format('MMMM DD, YYYY'),
          updatedDate = moment(this.state.data.updatedDate).format('MMMM DD, YYYY');
      
      return (
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {id: "back-to-index"}, 
            React.createElement(Link, {to: "home"}, "Home")
          ), 
          React.createElement("div", {id: "specific-blog"}, 
            React.createElement("div", {className: "row blog-name"}, 
              React.createElement("h1", null, this.state.data.name), 
              React.createElement(UpdateDelete, null)
            ), 
            React.createElement("div", {className: "row blog-date"}, 
              React.createElement("div", {className: "pull-left"}, 
                React.createElement("i", null, React.createElement("strong", null, "Created on: "), createdDate)
              ), 
              React.createElement("div", {className: "pull-right"}, 
                React.createElement("i", null, React.createElement("strong", null, "Updated on: "), updatedDate)
              )
            ), 
            React.createElement("div", {className: "row blog-body"}, 
              React.createElement("span", {dangerouslySetInnerHTML: {__html: this.state.data.body}})
            )
          )
        )
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Blog = Blog;
}(myLib.React , myLib.Router , myLib.aapi , myLib.Router.Link , myLib.moment , myLib.components.UpdateDelete));
(function(React , Link , aapi) {
  'use strict';
  var NewBlog = React.createClass({displayName: "NewBlog",
    validateForm : function() {
      var name = this.refs.name.getDOMNode().value.trim(),
          body = this.refs.body.getDOMNode().value.trim();
      if (!name || !body) {
        this.setState({
          message : 'Name and Body required'
        });
      }
      else {
        this.setState({
          message : ''
        });
        return {
          name : name,
          body : body
        };
      }
    },
    getInitialState : function() {
      return {
        message : ''
      };
    },
    onSubmit : function(e) {
      e.preventDefault();
      var refs = this.validateForm();
      if (refs) {
        aapi
          .blogs
          .create(refs , function(err , res) {
            if (err) throw err;
            if (res.code === 200) {
              console.log('Show user a new blog was created!')
            }
          });
      }
    },
    onInputChange : function(e) {
      this.validateForm();
    },
    render : function() {
      return (
        React.createElement("div", {id: "new-blog", className: "container"}, 
          React.createElement("div", {id: "back-to-index"}, 
            React.createElement(Link, {to: "home"}, "Home")
          ), 
          React.createElement("h3", null, "New blog"), 
          React.createElement("form", {onSubmit: this.onSubmit}, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("label", {for: "blog-name"}, "Name"), 
              React.createElement("input", {id: "blog-name", type: "text", className: "form-control", placeholder: "Your new blog name!", ref: "name", onChange: this.onInputChange})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("label", {for: "blog-body"}, "Body"), 
              React.createElement("textarea", {className: "form-control", rows: "50", id: "blog-body", ref: "body", onChange: this.onInputChange})
            ), 
            React.createElement("button", {type: "submit", className: "btn btn-success"}, "Create"), 
            React.createElement("div", {id: "error-message"}, 
              React.createElement("p", null, this.state.message)
            )
          )
        )
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.NewBlog = NewBlog;
  
}(myLib.React , myLib.Router.Link , myLib.aapi));
(function(React , Header , Body , Footer , Router , Blog , NewBlog) {
  'use strict';
  var RouteHandler = Router.RouteHandler,
      DefaultRoute = Router.DefaultRoute,
      Route = Router.Route;
  
  var App = React.createClass({displayName: "App",
    render : function() {
      return (
        React.createElement("div", {id: "main"}, 
          React.createElement(Header, null), 
          React.createElement(RouteHandler, null), 
          React.createElement(Footer, null)
        )
      );
    }
  });
  
  var routes = (
    React.createElement(Route, {name: "home", path: "/", handler: App}, 
      React.createElement(Route, {name: "new", path: "/blogs/new", handler: NewBlog}), 
      React.createElement(Route, {name: "blog", path: "/blogs/:id", handler: Blog}), 
      React.createElement(DefaultRoute, {handler: Body})
    )
  );
  
  Router.run(routes , function(Handler) {
    React.render(React.createElement(Handler, null) , document.getElementById('main-app'));
  });
}(myLib.React , myLib.components.Header , myLib.components.Body , myLib.components.Footer , myLib.Router , myLib.components.Blog , myLib.components.NewBlog));