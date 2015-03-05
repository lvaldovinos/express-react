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