'use strict';

var React = require('react');

var Footer = React.createClass({
  render : function() {
    return (
      <div id="footer-container">
        <div className="row" id="footer-info">
          <div className="col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1 col-xm-12">
            <h4 className="text-left">Let's touch base</h4>
            <div className="row">
              <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                <i className="fa fa-github fa-2x" ></i>
              </div>
              <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                <a href="https://github.com/lvaldovinos"> lvaldovinos </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                <i className="fa fa-linkedin fa-2x" ></i>
              </div>
              <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-6 col-xs-offset-1">
                <a href="https://www.linkedin.com/profile/view?id=280404993&trk=nav_responsive_tab_profile_pic"> Luis Valdovinos </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                <i className="fa fa-stack-overflow fa-2x" ></i>
              </div>
              <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                <a href="http://stackoverflow.com/users/3773628/lvaldovinos"> lvaldovinos </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                <i className="fa fa-twitter fa-2x" ></i>
              </div>
              <div className="col-md-9 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                <a href="https://twitter.com/alonsovalencia_?lang=en"> alonsovalecnia_ </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9 col-md-offset-2  col-sm-9 col-sm-offset-2 col-xs-8 col-xs-offset-4">
                <a href="https://www.npmjs.com/~lvaldovinos"> npm profile </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-md-offset-1 col-sm-5 col-sm-offset-1 col-xm-12">
            <h4 className="text-left">Current company</h4>     
            <h5 className="text-left"><a href="http://www.unosquare.com">Unosquare</a></h5>
            <div className="row">
              <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-2 col-sm-offset-0 col-md-offset-0">
                <i className="fa fa-globe fa-2x"></i>
              </div>
              <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-7 col-xs-offset-1">
                <address>
                  <strong>Guadalajara , Mexico</strong>
                  <div>Av. Américas 1536 1A</div>
                  <div>Col. Country Club</div>
                  <div>C.P. 44637</div>
                  <div>Jalisco, México</div>
                  <div id="company-phone">
                    <span>+52 (33) 3839-1855</span>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="footer-email">
          <div className="col-md-12">
            <p className="text-center">
              <i className="fa fa-envelope fa-lg" ></i>
              <a href="mailto:lastkiss115@gmail.com">  Luis Alonso Valdovinos Valencia</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Footer;