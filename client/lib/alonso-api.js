'use strict';
var myRequest = require('my-request').init('http://alonso-thoughtsapi.rhcloud.com'),
    aapi = {};
      
aapi.blogs = {
  read : function() {
        var blogs = [
          {
            _id : 1,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          },
          {
            _id : 2,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          },
          {
            _id : 3,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          },
          {
            _id : 4,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          },
          {
            _id : 5,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          },
          {
            _id : 6,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          },
          {
            _id : 7,
            name : 'Sample blog post',
            body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
            '<hr>' +
            '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
            '<blockquote>' +
            '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
            '</blockquote>' +
            '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
            '<h2>Heading</h2>' +
            '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
            '<pre><code>Example code block</code></pre>' +
            '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
            '<h3>Sub-heading</h3>' +
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
            '<ul>' +
            '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
            '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
            '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
            '</ul>' +
            '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
            '<ol>' +
            '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
            '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
            '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
            '</ol>' +
            '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            createdDate : new Date(),
            updatedDate : new Date(),
            shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
          }
        ];
        return blogs;
      },
      readById : function(id) {
        return {
          _id : id,
          name : 'Sample blog post',
          body : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>' +
          '<hr>' +
          '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>' +
          '<blockquote>' +
          '  <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>' +
          '</blockquote>' +
          '<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>' +
          '<h2>Heading</h2>' +
          '<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>' +
          '<h3>Sub-heading</h3>' +
          '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>' +
          '<pre><code>Example code block</code></pre>' +
          '<p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>' +
          '<h3>Sub-heading</h3>' +
          '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>' +
          '<ul>' +
          '  <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>' +
          '  <li>Donec id elit non mi porta gravida at eget metus.</li>' +
          '  <li>Nulla vitae elit libero, a pharetra augue.</li>' +
          '</ul>' +
          '<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>' +
          '<ol>' +
          '  <li>Vestibulum id ligula porta felis euismod semper.</li>' +
          '  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>' +
          '  <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>' +
          '</ol>' +
          '<p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
          createdDate : new Date(),
          updatedDate : new Date(),
          shortBody : '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstra...</p>'
        };
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
        .end(function(res) {
          var body = res.body || {};
          if (body.code === 200 && body.data['token_id']) {
            aux = true;
            token_id = body.data['token_id'];
            myRequest.setPermanent({ Authorization : token_id });
          }
          cb(body);
        });
    },
    delete : function(id , cb) {
      if (typeof id === 'function' && !cb && token_id) {
        cb = id;
        id = token_id;
      }
      myRequest
        .delete('/tokens/' + id)
        .end(function(res) {
          var body = res.body || {};
          if (body.code === 200) {
            aux = false;
            token_id = null;
          }
          cb(body);
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