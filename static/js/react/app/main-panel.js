var React = require('react');
var ReactDOM = require('react-dom');
var Tether = require('react-tether');
var ContainerSideBar = require('./sidebar.js');
var ContainerFixes = require('./fixes.js');
var ContainerCapsules = require('./capsules.js');
var ContainerDashboard = require('./dashboard.js');
var ContainerBilling = require('./billing.js');
var ContainerProfile = require('./profile.js');
var cookie = require('react-cookie');
var request = require('superagent');


var MainPanel = React.createClass({
  getInitialState: function() {
    return {
      displayContainerFixes: true,
      displayContainerCapsules: false,
      displayContainerDashboard: false,
      displayContainerBilling: false,
      displayContainerProfile: false,
      customer: null,
    }
  },
  displayContainerFixes: function(){
    console.log('displayContainerFixes')
    this.setState(
      {
        displayContainerFixes: true,
        displayContainerCapsules: false,
        displayContainerDashboard: false,
        displayContainerBilling: false,
        displayContainerProfile: false,
      }
    );
  },
  displayContainerCapsules: function(){
    this.setState(
      {
        displayContainerFixes: false,
        displayContainerCapsules: true,
        displayContainerDashboard: false,
        displayContainerBilling: false,
        displayContainerProfile: false,
      }
    );
  },
  displayContainerDashboard: function(){
    console.log('display dashboard');
    this.setState(
      {
        displayContainerFixes: false,
        displayContainerCapsules: false,
        displayContainerDashboard: true,
        displayContainerBilling: false,
        displayContainerProfile: false,
      }
    );
  },
  displayContainerBilling: function(){
    this.setState(
      {
        displayContainerFixes: false,
        displayContainerCapsules: false,
        displayContainerDashboard: false,
        displayContainerBilling: true,
        displayContainerProfile: false,
      }
    );
  },
  displayContainerProfile: function(){
    this.setState(
      {
        displayContainerFixes: false,
        displayContainerCapsules: false,
        displayContainerDashboard: false,
        displayContainerBilling: false,
        displayContainerProfile: true,
      }
    );
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
              <ContainerSideBar
                customer={this.state.customer}
                displayContainerFixes={this.displayContainerFixes}
                displayContainerCapsules={this.displayContainerCapsules}
                displayContainerDashboard={this.displayContainerDashboard}
                displayContainerBilling={this.displayContainerBilling}
                displayContainerProfile={this.displayContainerProfile}
                />
              <div class="main-panel">
                {this.state.displayContainerDashboard ? <ContainerDashboard /> : null}
                {this.state.displayContainerProfile ? <ContainerProfile /> : null}
                {this.state.displayContainerFixes ? <ContainerFixes /> : null}
                {this.state.displayContainerCapsules ? <ContainerCapsules /> : null}
                {this.state.displayContainerBilling ? <ContainerBilling /> : null}
              </div>
           </div>
  }
})



ReactDOM.render(
  <MainPanel />,
	document.getElementById('wrapper-main')
)
