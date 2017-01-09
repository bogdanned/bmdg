var React = require('react');
var ReactDOM = require('react-dom');
var Tether = require('react-tether');
var ContainerFixes = require('./fixes.js');
var ContainerCapsules = require('./capsules.js');
var ContainerDashboard = require('./dashboard.js');
var ContainerBilling = require('./billing.js');
var ContainerProfile = require('./profile.js');
var cookie = require('react-cookie');
var request = require('superagent');
var Router =  require('react-router').Router;
var Route =  require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;


var MainPanel = React.createClass({
  getInitialState: function() {
    return {
      customer: null,
    }
  },
  getCustomer: function(){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request.get("/api/customer/")
           .set('Accept', 'application/json')
           .set("X-CSRFToken", csrftoken)
           .end(function(err, res){
             var customer = JSON.parse(res.text);
             var customer = customer[0];
             self.setState({
               customer: customer,
             });
           })
  },
  componentDidMount: function() {
    this.getCustomer();
  },
  render: function(){
    return <div class="wrapper">
              <div class="sidebar" data-background-color="white" data-active-color="danger">
                      <div class="sidebar-wrapper">
                          <div class="logo">
                              <a href="" class="simple-text">
                                  {this.props.customer ? <img class="img img-responsive"  src={this.props.customer.image}/> : null}
                              </a>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                                {this.props.customer ?
                                  <p>Creditos : {this.props.customer.credits} </p>
                                : null}
                            </div>
                            <div class="col-md-12">
                              <p>
                                Subscription : null
                              </p>
                            </div>
                          </div>
                          <ul class="nav">
                              <li>
                                <Link activeClassName="active" to="dashboard">
                                  <i class="ti-panel"></i>
                                  <p>Dashboard</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="profile">
                                  <i class="ti-user"></i>
                                  <p>Mi Perfil</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="fixes">
                                  <i class="ti-view-list-alt "></i>
                                  <p>Cambios</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="capsules">
                                  <i class="ti-layout-grid2"></i>
                                  <p>Capsulas</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="billing">
                                  <i class="ti-text"></i>
                                  <p>Facturas</p>
                                </Link>
                              </li>
                          </ul>
                      </div>
                  </div>
                    <div class="main-panel">
                      {this.props.children}
                    </div>
                 </div>
  }
})



var MainPanelRouter = React.createClass({
  render: function(){
    return <Router history={hashHistory}>
            <Route path="/" component={MainPanel}>
              <IndexRoute component={ContainerDashboard} />
              <Route path="capsules" component={ContainerCapsules} ></Route>
              <Route path="fixes" component={ContainerFixes} ></Route>
              <Route path="profile" component={ContainerProfile} ></Route>
              <Route path="billing" component={ContainerBilling} ></Route>
              <Route path="dashboard" component={ContainerDashboard} ></Route>
            </ Route>
           </ Router>
  }
});


ReactDOM.render(
  <MainPanelRouter />,
	document.getElementById('body-main')
)
