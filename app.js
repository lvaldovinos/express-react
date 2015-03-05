//allow jsx to be executed on node-jsx
require('node-jsx').install();   

var http = require('http'),
    express = require('express'),
    mustacheExpress = require('mustache-express'),
    path = require('path'),
    React = require('react'),
    Main = require('./client/components/render-server/main'),
    aapi = require('./client/lib/alonso-api'),
    app = express();

app.engine('mustache' , mustacheExpress());
app.set('views' , path.resolve(__dirname , './views'));
app.set('view engine' , 'mustache');

app.use(express.static(path.resolve(__dirname , './public')));

app.get('/' , function(req , res) {
  var mainMu;
  //get data from alonso-api
  aapi
    .blogs
    .read(function(err , response) {
      if (err) throw err;
      if (response.code === 200) {
        mainMu = React.renderToString(Main({ data : response.data}));
        res.render('base' , {
          mainMu : mainMu
        });
      }
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