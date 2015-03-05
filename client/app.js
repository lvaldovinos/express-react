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