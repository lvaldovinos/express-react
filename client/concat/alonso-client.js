(function(React , moment , aapi) {
  var ShortBlog = React.createClass({
    render : function() {
      var name = this.props.name,
          createdDate = moment(this.props.createdDate).format('MMMM DD, YYYY'),
          body = this.props.children,
          viewFull = '/' + this.props.id;;
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
            <a href={viewFull}>View full page</a>
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
          body = this.props.children,
          viewFull = '/' + this.props.id;
        
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
                <a href={viewFull}>View full page</a>
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
  
  React.render(<BlogPagination data={aapi.blogs.read()} limit={1} /> , document.getElementById('blog-pagination')); 
  
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
            <button className="btn btn-default" onClick={this.handleClick}><i className="fa fa-google-plus fa-lg"></i>  Sign in</button>
          </div>
        );
      }
  });
  
  React.render(<GoogleSignin clientId='808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com' scope='https://www.googleapis.com/auth/userinfo.email'/> , document.getElementById('google-signin'));
  
}(window.myLib.React , window.gapi));