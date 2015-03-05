(function(React , moment , aapi , Link) {
  'use strict';
  var ShortBlog = React.createClass({
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
      //shorten body..
      return (
        <div className="shortBlog clearfix">
          <h5>{name}</h5>
          <div className="clearfix">
            <div className="blog-date pull-left">
              <i>{createdDate}</i>
            </div>
          </div>
          <small>
            <span dangerouslySetInnerHTML={{__html : body}} />
          </small>
          <div className="pull-right">
            <Link to="blog" params={{id : this.props.id}}>View full page</Link>
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
          <ShortBlog name={blog.name} createdDate={blog.createdDate} id={blog._id} key={blog._id}>
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
  var Blog = React.createClass({
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children;
        
      return (
        <div className="blog">
            <div className="row">
              <h2>{name}</h2>
            </div>
            <div className="row">
              <div className="blog-date pull-left">
                <i>{createdDate}</i>
              </div>
              <div className="pull-right">
                <Link to="blog" params={{id : this.props.id}}>View full page</Link>
              </div>
            </div>
            <div className="row">
              <span dangerouslySetInnerHTML={{__html: body}} />
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
          <Blog name={blog.name} createdDate={blog.createdDate} id={blog._id} key={blog._id}>
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
  
  var Previous = React.createClass({
    handleClick : function(e) {
      e.preventDefault();
      this.props.onClick();
    },
    render : function() {
      var className = this.props.className + ' pull-left';
      return (
        <li className={className}><a href="#" onClick={this.handleClick}>Previous</a></li>
      );
    }
  });
  
  var Next = React.createClass({
    handleClick : function(e) {
      e.preventDefault();
      this.props.onClick();
    },
    render : function() {
      var className = this.props.className + ' pull-right';
      return (
        <li className={className}><a href="#" onClick={this.handleClick}>Next</a></li>
      );
    }
  });
  
  var Pager = React.createClass({
    render : function() {
      var previousEl = <Previous onClick={this.props.onPrevious} className="show"/>,
          nextEl = <Next onClick={this.props.onNext} className="show"/>;
      switch (this.props.index) {
        case 1:
          previousEl = <Previous onClick={this.props.onPrevious} className="hidden"/>;
        break;
        case this.props.totalPages:
          nextEl = <Next onClick={this.props.onNext} className="hidden"/>;
        break;
      }
      if (this.props.totalPages === 1) {
        nextEl = <Next onClick={this.props.onNext} className="hidden"/>;
      }
      console.log('Page: ' + this.props.index);
      return (
        <div className="blogpagination-pager">
          <nav>
            <ul className="pager">
              {previousEl}
              {nextEl}
            </ul>
          </nav>
        </div>
      );
    }
  });
  
  var BlogPagination = React.createClass({
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
        <div className="blogPagination">
          <Pager index={this.state.pageIndex} totalPages={totalPages} onPrevious={this.onPrevious} onNext={this.onNext} />
          <BlogList data={this.showPage(this.state.pageIndex)} />
          <Pager index={this.state.pageIndex} totalPages={totalPages} onPrevious={this.onPrevious} onNext={this.onNext} />
        </div>
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
  var Footer = React.createClass({
    render : function() {
      return (
        <div id="footer-container">
          <div className="row" id="footer-info">
            <div className="col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1 col-xm-12">
              <h4 className="text-left">Let's touch base</h4>
              <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                  <i className="fa fa-github fa-2x" ></i>
                </div>
                <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                  <a href="https://github.com/lvaldovinos"> lvaldovinos </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                  <i className="fa fa-linkedin fa-2x" ></i>
                </div>
                <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-6 col-xs-offset-1">
                  <a href="https://www.linkedin.com/profile/view?id=280404993&trk=nav_responsive_tab_profile_pic"> Luis Valdovinos </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                  <i className="fa fa-stack-overflow fa-2x" ></i>
                </div>
                <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                  <a href="http://stackoverflow.com/users/3773628/lvaldovinos"> lvaldovinos </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                  <i className="fa fa-twitter fa-2x" ></i>
                </div>
                <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                  <a href="https://twitter.com/alonsovalencia_?lang=en"> alonsovalecnia_ </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9 col-md-offset-2  col-sm-9 col-sm-offset-2 col-xs-8 col-xs-offset-4">
                  <a href="https://www.npmjs.com/~lvaldovinos"> npm profile </a>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1 col-xm-12">
              <h4 className="text-left">Current company</h4>     
              <h5 className="text-left"><a href="http://www.unosquare.com">Unosquare</a></h5>
              <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                  <i className="fa fa-globe fa-2x"></i>
                </div>
                <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                  <address>
                    <strong>Guadalajara , Mexico</strong>
                    <div>Av. Américas 1536 1A</div>
                    <div>Col. Country Club</div>
                    <div>C.P. 44637</div>
                    <div>Jalisco, México</div>
                    <div id="company-phone">
                      <span>+52 (33) 3839-1855</span>
                    </div>
                  </address>
                </div>
              </div>
            </div>
          </div>
          <div className="row" id="footer-email">
            <div className="col-md-12">
              <p className="text-center">
                <i className="fa fa-envelope fa-lg" ></i>
                <a href="mailto:lastkiss115@gmail.com">  Luis Alonso Valdovinos Valencia</a>
              </p>
            </div>
          </div>
        </div>
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
  var GoogleSignin = React.createClass({
      handleClick : function(e) {
        this.props.onClick(e);
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
}(myLib.React));
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
(function(React) {
  'use strict';
  var Header = React.createClass({
    render : function() {
      return (
        <div className="row" id="header-container">
          <div className="col-md-12">
            <h1 className="text-center">Alonso thoughts</h1>
            <p className="text-center lead">Happiness only real when shared</p>
          </div>
        </div>
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
  var NewBlogButton = React.createClass({
    render : function() {
      return (
        <Link to="new" className="btn btn-success">New Blog</Link>
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
      var button = <GoogleSignin onClick={this.onSignIn}/>;
      if (this.state.aux) {
        button = (
          <div>
            <GoogleSignout onClick={this.onSignOut}/>
            <NewBlogButton />
          </div>
        );
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
  
}(myLib.React , myLib.components.GoogleSignin , myLib.components.GoogleSignout , myLib.components.NewBlogButton , myLib.aapi , gapi));
(function(React , aapi) {
  'use strict';
  var UpdateDelete = React.createClass({
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
        <div id="update-delete" className={klass}>
          <i className="fa fa-pencil-square-o fa-2x" onClick={this.onEdit}></i>
          <i className="fa fa-times fa-2x" onClick={this.onDelete}></i>
        </div>
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
  var Body = React.createClass({
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
                  <ActivityBox data={this.state.data.slice(0 , 3)} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-md-offset-1 .col-sm-12" id="right-container">
            <div id="blog-pagination">
              <BlogPagination data={this.state.data}
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
(function(React , Router , aapi , Link , moment , UpdateDelete) {
  'use strict';
  var Blog = React.createClass({
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
        <div className="container">
          <div id="back-to-index">
            <Link to="home">Home</Link>
          </div>
          <div id="specific-blog">
            <div className="row blog-name">
              <h1>{this.state.data.name}</h1>
              <UpdateDelete />
            </div>
            <div className="row blog-date">
              <div className="pull-left">
                <i><strong>Created on: </strong>{createdDate}</i>
              </div>
              <div className="pull-right">
                <i><strong>Updated on: </strong>{updatedDate}</i>
              </div>
            </div>
            <div className="row blog-body">
              <span dangerouslySetInnerHTML={{__html: this.state.data.body}} />
            </div>
          </div>
        </div>
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
  var NewBlog = React.createClass({
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
        <div id="new-blog" className="container">
          <div id="back-to-index">
            <Link to="home">Home</Link>
          </div>
          <h3>New blog</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="blog-name">Name</label>
              <input id="blog-name" type="text" className="form-control" placeholder="Your new blog name!" ref="name" onChange={this.onInputChange}/>
            </div>
            <div className="form-group">
              <label for="blog-body">Body</label>
              <textarea className="form-control" rows="50" id="blog-body" ref="body" onChange={this.onInputChange}></textarea>
            </div>
            <button type="submit" className="btn btn-success">Create</button>
            <div id="error-message">
              <p>{this.state.message}</p>
            </div>
          </form>
        </div>
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
  
  var App = React.createClass({
    render : function() {
      return (
        <div id="main">
          <Header />
          <RouteHandler />
          <Footer />
        </div>
      );
    }
  });
  
  var routes = (
    <Route name="home" path="/" handler={App}>
      <Route name="new" path="/blogs/new" handler={NewBlog} />
      <Route name="blog" path="/blogs/:id" handler={Blog} />
      <DefaultRoute handler={Body} />
    </Route>
  );
  
  Router.run(routes , function(Handler) {
    React.render(<Handler /> , document.getElementById('main-app'));
  });
}(myLib.React , myLib.components.Header , myLib.components.Body , myLib.components.Footer , myLib.Router , myLib.components.Blog , myLib.components.NewBlog));