(function(React , Link , aapi) {
  'use strict';
  var NewBlog = React.createClass({
    validateForm : function() {
      var name = this.refs.name.getDOMNode().value.trim(),
          body = this.refs.body.getDOMNode().value.trim();
      if (!name || !body) {
        this.setState({
          message : 'Name and Body required'
        });
      }
      else {
        this.setState({
          message : ''
        });
        return {
          name : name,
          body : body
        };
      }
    },
    getInitialState : function() {
      return {
        message : ''
      };
    },
    onSubmit : function(e) {
      e.preventDefault();
      var refs = this.validateForm();
      if (refs) {
        aapi
          .blogs
          .create(refs , function(err , res) {
            if (err) throw err;
            if (res.code === 200) {
              console.log('Show user a new blog was created!')
            }
          });
      }
    },
    onInputChange : function(e) {
      this.validateForm();
    },
    render : function() {
      return (
        <div id="new-blog" className="container">
          <div id="back-to-index">
            <Link to="home">Home</Link>
          </div>
          <h3>New blog</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="blog-name">Name</label>
              <input id="blog-name" type="text" className="form-control" placeholder="Your new blog name!" ref="name" onChange={this.onInputChange}/>
            </div>
            <div className="form-group">
              <label for="blog-body">Body</label>
              <textarea className="form-control" rows="50" id="blog-body" ref="body" onChange={this.onInputChange}></textarea>
            </div>
            <button type="submit" className="btn btn-success">Create</button>
            <div id="error-message">
              <p>{this.state.message}</p>
            </div>
          </form>
        </div>
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.NewBlog = NewBlog;
  
}(myLib.React , myLib.Router.Link , myLib.aapi));