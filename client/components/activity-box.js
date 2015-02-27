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