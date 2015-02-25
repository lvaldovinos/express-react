'use strict';
var React = require('react'),
    moment = require('moment');

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
  
module.exports = BlogPagination;