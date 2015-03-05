(function(React , Router , aapi , Link , moment , UpdateDelete) {
  'use strict';
  var Blog = React.createClass({
    mixins : [Router.State],
    getInitialState : function() {
      return {
        data : {}
      };
    },
    componentDidMount : function() {
      aapi
        .blogs
        .readById(this.getParams().id , function(err , res) {
          if (err) throw err;
          if (res.code === 200) {            
            this.setState({
              data : res.data
            });
          }
        }.bind(this));
    },
    render : function() {
      var createdDate = moment(this.state.data.createdDate).format('MMMM DD, YYYY'),
          updatedDate = moment(this.state.data.updatedDate).format('MMMM DD, YYYY');
      
      return (
        <div className="container">
          <div id="back-to-index">
            <Link to="home">Home</Link>
          </div>
          <div id="specific-blog">
            <div className="row blog-name">
              <h1>{this.state.data.name}</h1>
              <UpdateDelete id={this.state.data._id}/>
            </div>
            <div className="row blog-date">
              <div className="pull-left">
                <i><strong>Created on: </strong>{createdDate}</i>
              </div>
              <div className="pull-right">
                <i><strong>Updated on: </strong>{updatedDate}</i>
              </div>
            </div>
            <div className="row blog-body">
              <span dangerouslySetInnerHTML={{__html: this.state.data.body}} />
            </div>
          </div>
        </div>
      );
    }
  });
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.Blog = Blog;
}(myLib.React , myLib.Router , myLib.aapi , myLib.Router.Link , myLib.moment , myLib.components.UpdateDelete));