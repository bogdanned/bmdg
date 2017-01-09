var React = require('react');
var ReactDOM = require('react-dom');
var Tether = require('react-tether');
var request = require('superagent');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var cookie = require('react-cookie');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
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
var Checkbox = require('react-bootstrap').Checkbox;
var PaymentForm = require("./payment_form.js");
var ProgressBar = require('react-bootstrap').ProgressBar;

var CapsuleFixesList = React.createClass({
  render: function(){
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      var capsuleFixList = this.props.fixes.map(function(fix, index){
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
    var title = <div class="half-width">
                  <p class="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p class="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div class="col-sm-6 col-md-9">
             <Panel collapsible header={title} bsStyle="danger">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
})


var CapsuleDone = React.createClass({
  render: function(){
    var title = <div class="half-width">
                  <p class="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p class="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div class="col-sm-6 col-md-9">
             <Panel collapsible header={title} bsStyle="warning">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
})


var CapsuleDevelopment = React.createClass({
  render: function(){
    const label = this.props.capsule.progress;
    var progressBar = <div>
                        <div class="half-width">
                          <p class="p-item-description">Capsula {this.props.capsule.id}</p>
                          <p class="p-item-date"> {this.props.capsule.created} {this.props.capsule.status} Cambios: {this.props.capsule.fixes.length}</p>
                        </div>
                        <div class="half-width">
                          <ProgressBar striped bsStyle="success" now={this.props.capsule.progress}  label={`${label}%`} />
                        </div>
                      </div>
    return <div class="col-sm-6 col-md-9">
             <Panel collapsible defaultExpanded header={progressBar} bsStyle="success">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
})


var CapsuleApproved = React.createClass({
  getInitialState: function(){
    return {
      show: false,
      fixCreditTotal: 0,
      misingCredits: null,
      token: null,
      amount: 0,
    }
  },
  showModal: function() {
    this.setState({show: true});
  },
  hideModal: function() {
    this.setState({show: false});
  },
  getPaymentToken: function(){
    csrftoken = cookie.load('csrftoken');
    self = this;
  },
  calculateCreditSum: function() {
    if (this.props.capsule.fixes){
      var fixCreditTotal = 0;
      for (f of this.props.capsule.fixes){
        fixCreditTotal = fixCreditTotal + f.credits;
      }
      var misingCredits = null;
      if (fixCreditTotal > this.props.customer.credits){
        misingCredits = fixCreditTotal -  this.props.customer.credits;
      }
      this.setState({
        fixCreditTotal: fixCreditTotal,
        misingCredits: misingCredits,
      });
    }
  },
  componentDidMount: function(){
    this.calculateCreditSum();
  },
  render: function(){
    var title = <div class="half-width">
                  <p class="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p class="p-item-date"> {this.props.capsule.created} {this.props.capsule.status} Cambios: {this.props.capsule.fixes.length}</p>
                </div>
    return <div class="col-sm-6 col-md-9">
             <Panel collapsible header={title} bsStyle="primary">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
              <Row>
                <Col>
                  <p>{this.state.total}</p>
                  <Button onClick={this.showModal} bsClass="btn btn-cta pull-right">
                      Acceptar Cambios
                  </Button>
                </Col>
              </Row>
              <Modal
                show={this.state.show}
                onHide={this.hideModal}
                dialogClassName="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">Enviar Capsula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Te faltan Creditos</h4>
                  <p>Total: {this.state.fixCreditTotal ? this.state.fixCreditTotal : null}</p>
                  <p>Creditos: {this.props.customer ? this.props.customer.credits : null}</p>
                  <p>Te faltan: {this.state.misingCredits ? this.state.misingCredits : null } creditos</p>
                  <PaymentForm amount={this.state.amount}/>
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
    self = this;
    request.get("/api/capsules/")
           .set('Accept', 'application/json')
           .set("X-CSRFToken", csrftoken)
           .end(function(err, res){
             var requestedCapsules = [];
             var approvedCapsules = [];
             var developmentCapsules = [];
             var doneCapsules = [];
             var c, capsules = JSON.parse(res.text);
             for (c of capsules){
               if (c.status == "APPROVED"){
                 approvedCapsules.push(c);
               } else if(c.status == "REQUESTED"){
                 requestedCapsules.push(c);
               }else if(c.status == "DEVELOPMENT"){
                  developmentCapsules.push(c);
               }else if(c.status == "DONE"){
                  doneCapsules.push(c);
               }
             }
             self.setState({
               requestedCapsules: requestedCapsules,
               approvedCapsules: approvedCapsules,
               developmentCapsules: developmentCapsules,
               doneCapsules: doneCapsules,
             });
           });
  },
  componentDidMount: function(){
    this.getCapsules();
  },
  render: function(){
    var self = this;
    if (!this.state.requestedCapsules || this.state.requestedCapsules.length == 0){
      var capsulePendingList = '';
    }else{
      var capsulePendingList = this.state.requestedCapsules.map(function(capsule, index){
          return <CapsuleRequested
                  key={capsule.id}
                  capsule={capsule}
                  />
      })
    }
    if (!this.state.approvedCapsules || this.state.approvedCapsules.length == 0){
      var capsuleApprovedList = '';
    }else{
      var capsuleApprovedList = this.state.approvedCapsules.map(function(capsule, index){
          return <CapsuleApproved
                  key={capsule.id}
                  capsule={capsule}
                  customer={self.props.customer}
                  />
      })
    }
    if (!this.state.developmentCapsules || this.state.developmentCapsules.length == 0){
      var capsuleDevelopmentList = '';
    }else{
      var capsuleDevelopmentList = this.state.developmentCapsules.map(function(capsule, index){
          return <CapsuleDevelopment
                  key={capsule.id}
                  capsule={capsule}
                  customer={self.props.customer}
                  />
      })
    }
    if (!this.state.doneCapsules || this.state.doneCapsules.length == 0){
      var capsuleDoneList = '';
    }else{
      var capsuleDoneList = this.state.doneCapsules.map(function(capsule, index){
          return <CapsuleDone
                  key={capsule.id}
                  capsule={capsule}
                  customer={self.props.customer}
                  />
      })
    }
    return <div class="row full-heigh">
            <div class="col-fix-list col-md-12">
              <div class="container">
                  <div class="row">
                      {capsulePendingList}
                    </div>
                    <div class="row">
                      {capsuleApprovedList}
                    </div>
                    <div class="row">
                      {capsuleDevelopmentList}
                    </div>
                    <div class="row">
                      {capsuleDoneList}
                    </div>
                 </div>
              </div>
           </div>
  }
})


module.exports = ContainerCapsules;
