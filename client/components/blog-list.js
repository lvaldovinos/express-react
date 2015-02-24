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