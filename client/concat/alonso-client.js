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
          <ShortBlog name={blog.name} createdDate={blog.createdDate} id={blog._id}>
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
          <Blog name={blog.name} createdDate={blog.createdDate} id={blog._id}>
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
(function(React , gapi) {
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
}(myLib.React , gapi));
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
(function(BlogPagination , ActivityBox , GoogleSignin , aapi , React) {
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
                  <GoogleSignin clientId={'808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com'}
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
  
}(myLib.components.BlogPagination , myLib.components.ActivityBox , myLib.components.GoogleSignin , myLib.aapi , myLib.React));
(function(React , Router) {
  'use strict';
  var Blog = React.createClass({
    mixins : [Router.State],
    render : function() {
      return (
        <div className="container" id="specific-blog">
          <h1>{this.getParams().id}</h1>
        </div>
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Blog = Blog;
}(myLib.React , myLib.Router));
(function(React , Header , Body , Footer , Router , Blog) {
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
      <Route name="blog" path="/blogs/:id" handler={Blog} />
      <DefaultRoute handler={Body} />
    </Route>
  );
  
  Router.run(routes , function(Handler) {
    React.render(<Handler /> , document.getElementById('main-app'));
  });
}(myLib.React , myLib.components.Header , myLib.components.Body , myLib.components.Footer , myLib.Router , myLib.components.Blog));