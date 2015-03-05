(function(React , aapi , Navigation) {
  'use strict';
  var UpdateDelete = React.createClass({
    mixins : [Navigation],
    getInitialState : function() {
      return {
        aux : aapi.tokens.isAlonsoLoggedIn()
      };
    },
    componentDidMount : function() {
      this.setState({
        aux : aapi.tokens.isAlonsoLoggedIn()
      });
    },
    onEdit : function(e) {
      console.log('Edit blog:' + this.props.id);
      this.transitionTo('new');
    },
    onDelete : function(e) {
      console.log('Delete blog:' + this.props.id);
      aapi
        .blogs
        .delete(this.props.id , function(err , res) {
          if (err) throw err;
          if (res.code === 200) {
            this.transitionTo('home');
          }
        }.bind(this));
    },
    render : function() {
      var klass = 'hidden';
      if (this.state.aux) {
        klass = 'show';
      }
      return (
        <div id="update-delete" className={klass}>
          <i className="fa fa-pencil-square-o fa-2x" onClick={this.onEdit}></i>
          <i className="fa fa-times fa-2x" onClick={this.onDelete}></i>
        </div>
      );
    }
  });
  
  
  if (!window.myLib.components) {
    window.myLib.components = {};
  }
  window.myLib.components.UpdateDelete = UpdateDelete;
}(myLib.React , myLib.aapi , myLib.Router.Navigation));