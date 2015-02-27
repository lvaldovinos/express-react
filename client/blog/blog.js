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