'use strict';
var myRequest = require('my-request').init('http://alonso-thoughtsapi.rhcloud.com'),
    aapi = {};
      
aapi.blogs = {
  read : function(opts , cb) {
    var query = '';
    if (typeof opts === 'function') {
      cb = opts;
    }
    if (opts && opts.offset) {
      query += '?offset=' + opts.offset;
    }
    if (opts && opts.limit) {
      query += '&limit=' + opts.limit;
    }
    myRequest
      .get('/blogs' + query)
      .end(function(err , res) {
        if (err) return cb(err);
        var body = res.body;
        cb(null , body);
      });
  },
  readById : function(id , cb) {
    myRequest
      .get('/blogs/' + id)
      .end(function(err , res) {
        if (err) return cb(err);
        var body = res.body;
        cb(null , body);
      });
  },
  delete : function(id , cb) {
    myRequest
      .delete('/blogs/' + id)
      .end(function(err , res) {
        if (err) return cb(err);
        var body = res.body;
        cb(null , body);
      });
  },
  create : function(spec , cb) {
    myRequest
      .post('/blogs')
      .send(spec)
      .end(function(err , res) {
        if (err) return cb(err);
        var body = res.body;
        cb(null , body);
      });
  }
};


aapi.tokens = (function() {
  var aux = false,
      token_id;
  return {
    create : function(gToken , cb) {
      myRequest
        .post('/tokens')
        .send({ token : gToken })
        .end(function(err , res) {
          if (err) return cb(err);
          var body = res.body || {};
          if (body.code === 200 && body.data['token_id']) {
            aux = true;
            token_id = body.data['token_id'];
            myRequest.setPermanent({ Authorization : token_id });
          }
          cb(null , body);
        });
    },
    delete : function(id , cb) {
      if (typeof id === 'function' && !cb && token_id) {
        cb = id;
        id = token_id;
      }
      myRequest
        .delete('/tokens/' + id)
        .end(function(err , res) {
          if (err) return cb(err);
          var body = res.body || {};
          if (body.code === 200) {
            aux = false;
            token_id = null;
          }
          cb(null , body);
        });
    },
    isAlonsoLoggedIn : function() {
      return aux;
    },
    getTokenId : function() {
      return token_id;
    }
  };
}());
  
module.exports = aapi;