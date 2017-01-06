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
var Label = require('react-bootstrap').Label;
var Modal = require('react-bootstrap').Modal;



var CapsuleFixesList = React.createClass({
  render: function(){
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      var capsuleFixList = this.props.fixes.map(function(fix, index){
          console.log(fix.status)
          return <ListGroupItem key={index}>
                  {fix.description}
                  <Label bsStyle="primary" class="pull-right">{fix.status}</Label>
                  {fix.credits ?
                    <Label bsStyle="primary" class="pull-right">Creditos:{fix.credits}</Label>
                  : null}
                 </ListGroupItem>
      })
      return <ListGroup fill>
              {capsuleFixList}
             </ListGroup>
    }
  }
})




var CapsuleRequested = React.createClass({
  render: function(){
    var title = <h3>{this.props.capsule.created}{this.props.capsule.status}</h3>
    return <div class="col-md-12">
             <Panel collapsible defaultExpanded header={title} bsStyle="danger">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
})


var CapsuleApproved = React.createClass({
  getInitialState: function(){
    return {show: false}
  },
  showModal: function() {
    this.setState({show: true});
  },
  hideModal: function() {
    this.setState({show: false});
  },
  render: function(){
    var title = <h3>{this.props.capsule.created} Cambios: {this.props.capsule.fixes.length} Status: {this.props.capsule.status}</h3>
    return <div class="col-md-12">
             <Panel collapsible defaultExpanded header={title} bsStyle="danger">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
              <Button onClick={this.showModal} bsClass="btn btn-cta pull-right">
                  Pagar
              </Button>
              <Modal
                show={this.state.show}
                onHide={this.hideModal}
                dialogClassName="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">Enviar Capsula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>¿Estas Seguro?</h4>
                  <p>Has añadido {this.props.capsule.fixes.length} cambios. Los cambios serán revisados por nuestros
                  desarrollos en un plazo de <strong>24 horas</strong>
                  y recibiras un mail con la estimación de creditos.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.hideModal} bsClass="btn btn-alert btn-cta pull-left">Cerrar</Button>
                  <Button onClick={this.sendCapsule}  bsClass="btn btn-primary btn-cta pull-right">Enviar Cambios</Button>
                </Modal.Footer>
              </Modal>
             </Panel>
           </div>
  }
})



var ContainerCapsule = React.createClass({
  render: function(){
    if (!this.props.requestedCapsules || this.props.requestedCapsules.length == 0){
      var capsulePendingList = '';
    }else{
      var capsulePendingList = this.props.requestedCapsules.map(function(capsule, index){
          return <CapsuleRequested key={capsule.id} capsule={capsule} />
      })
    }
    if (!this.props.approvedCapsules || this.props.approvedCapsules.length == 0){
      var capsuleApprovedList = '';
    }else{
      var capsuleApprovedList = this.props.approvedCapsules.map(function(capsule, index){
          return <CapsuleApproved key={capsule.id} capsule={capsule} />
      })
    }
    return <div class="container">
            <div class="row">
              {capsulePendingList}
            </div>
            <div class="row">
              {capsuleApprovedList}
            </div>
           </div>
  }
})



//Container
var ContainerCapsules = React.createClass({
  getInitialState: function(){
    return {
      requestedCapsules: '',
      approvedCapsules:'',
      developmentCapsules: '',
    }
  },
  getCapsules: function(){
    csrftoken = cookie.load('csrftoken');
    session_id = cookie.load('session_id');
    self = this;
    request.get("/api/capsules/")
           .set('Accept', 'application/json')
           .set("X-CSRFToken", csrftoken)
           .end(function(err, res){
             requestedCapsules = [];
             approvedCapsules = [];
             developmentCapsules = [];
             var c, capsules = JSON.parse(res.text);
             for (c of capsules){
               if (c.status = "APPROVED"){
                 approvedCapsules.push(c);
               } else if(c.status = "REQUESTED"){
                 requestedCapsules.push(c);
               }
             }
             self.setState({
               requestedCapsules: requestedCapsules,
               approvedCapsules: approvedCapsules,
             });
           });
  },

  componentDidMount: function(){
    this.getCapsules();
  },
  render: function(){
    return <div class="row full-heigh">
            <div class="col-fix-list col-md-12">
             <ContainerCapsule
              requestedCapsules={this.state.requestedCapsules}
              approvedCapsules={this.state.approvedCapsules}
              />
            </div>
           </div>
  }
})


/* Rendering Container Form */
ReactDOM.render(
  <ContainerCapsules />,
	document.getElementById('container-capsules')
)
