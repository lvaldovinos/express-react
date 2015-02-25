//allow jsx to be executed on node-jsx
require('node-jsx').install();   

var http = require('http'),
    express = require('express'),
    mustacheExpress = require('mustache-express'),
    path = require('path'),
    React = require('react'),
    aapi = require('./client/lib/alonso-api'),
    BlogPagination = require('./client/components/render-server/blog-pagination'),
    ActivityBox = require('./client/components/render-server/activity-box'),
    GoogleSignin = require('./client/components/render-server/google-signin'),
    app = express();

app.engine('mustache' , mustacheExpress());
app.set('views' , path.resolve(__dirname , './views'));
app.set('view engine' , 'mustache');

app.use(express.static(path.resolve(__dirname , './public')));

app.get('/' , function(req , res) {
  var blogsMu = React.renderToString(BlogPagination({
        data : aapi.blogs.read(),
        limit : 2
      })),
      activityBoxMu = React.renderToString(ActivityBox({ 
        data : aapi.blogs.read({
          offset : 0,
          limit : 3
        })
      })),
      googleSigninMu = React.renderToString(GoogleSignin({
        clientId : '808577327383-iua4f59mchljenv33gg49bhkn137nqjm.apps.googleusercontent.com',
        scope : 'https://www.googleapis.com/auth/userinfo.email'
      }));
  res.render('base' , {
    blogsMu : blogsMu,
    activityBoxMu : activityBoxMu,
    googleSigninMu : googleSigninMu
  });
});

app.get('/:name' , function(req , res) {
  var name = req.params.name;
  res.render('base' , { name : name });
});


http
  .createServer(app)
  .listen(3003 , function(err) {
    if (err) throw err;
    console.log('Server listening on http://localhost:3003');
  });