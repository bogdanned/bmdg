var React = require('react');
var ReactDOM = require('react-dom');
var Tether = require('react-tether');
var request = require('superagent');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var cookie = require('react-cookie');
var Col = require('react-bootstrap').Col;
var FormGroup = require('react-bootstrap').FormGroup;
var HelpBlock = require('react-bootstrap').HelpBlock;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Modal = require('react-bootstrap').Modal;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var FieldGroup = require('react-bootstrap').FieldGroup;
var Panel = require('react-bootstrap').Panel;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;



var CapsuleFixesList = React.createClass({
  render: function(){
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      var capsuleFixList = this.props.fixes.map(function(fix, index){
          return <ListGroupItem key={index}>{fix.description}</ListGroupItem>
      })
      return <ListGroup fill>
              {capsuleFixList}
             </ListGroup>
    }
  }
})




var Capsule = React.createClass({
  render: function(){
    var title = <h3>{this.props.capsule.created}{this.props.capsule.status}</h3>
    return <div class="col-md-4">
             <Panel collapsible defaultExpanded header={title} bsStyle="danger">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
})



var ContainerCapsulePending = React.createClass({
  render: function(){
    if (!this.props.pendingCapsules || this.props.pendingCapsules.length == 0){
      return <p></p>
    } else {
      var capsuleList = this.props.pendingCapsules.map(function(capsule, index){
          return <Capsule key={capsule.id} capsule={capsule} />
      })
      return <div class="container">
              <div class="row">
                {capsuleList}
              </div>
             </div>
    }
  }
})



//Container
var ContainerCapsules = React.createClass({
  getInitialState: function(){
    return {
      pendingCapsules: '',
      pricedCapsules:'',
      dueCapsules: '',
    }
  },
  getPendingCapsules: function(){
    csrftoken = cookie.load('csrftoken');
    session_id = cookie.load('session_id');
    self = this;
    request.get("/api/capsules/")
           .set('Accept', 'application/json')
           .set("X-CSRFToken", csrftoken)
           .end(function(err, res){
             self.setState({pendingCapsules: JSON.parse(res.text)});
           });
  },
  componentDidMount: function(){
    this.getPendingCapsules();
  },
  render: function(){
    return <div class="row full-heigh">
            <div class="col-fix-list col-md-12">
             <ContainerCapsulePending pendingCapsules={this.state.pendingCapsules}/>
            </div>
           </div>
  }
})


/* Rendering Container Form */
ReactDOM.render(
  <ContainerCapsules />,
	document.getElementById('container-capsules')
)
