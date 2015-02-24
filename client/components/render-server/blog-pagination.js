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
  
  var Pager = React.createClass({
    render : function() {
      var totalPages = this.props.count/this.props.limitPage,
          roundedPages = ( totalPages > Math.round(totalPages) ) ? Math.round(totalPages) + 1 : Math.round(totalPages),
          i = 1,
          liElements = [];
          console.log('Total pages to render: ' + roundedPages);
      for (i ; i <= roundedPages ; i += 1) {
        if (this.props.index === i) {
          liElements.push(<Page id={i} isActive=true>);
        }
        else {
          liElements.push(<Page id={i} isActive=false>);
        }
      }
      return (
        <nav>
          <ul className="pagination">
            <Previous />
            {liElements}
            <Next />
          </ul>
        </nav>
        {liElements}
      );
    }
  });
  
  var BlogPagination = React.createClass({
    getInitialState : function() {
      return {
        pageIndex : 1
      };
    },
    render : function() {
      return (
        <Pager index={this.state.pageIndex} count={this.props.data.length} limitPage=2/>
      );
    }
  });
  
module.exports = BlogPagination;