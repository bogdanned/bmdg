import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as capsulesActions from '../actions/capsulesActions'
import * as customerActions from '../actions/customerActions'
import { Col,
         Row,
         Panel,
         ListGroup,
         ListGroupItem,
         Label,
         ProgressBar,
         Modal,
         Button
       } from 'react-bootstrap'
import { PaymentForm } from './paymentForm'


class CapsuleFixesList extends React.Component{
  render() {
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      var capsuleFixList = this.props.fixes.map(function(fix, index){
          return <ListGroupItem key={index}>
                  {fix.description}
                  <Label bsStyle="primary" className="pull-right">{fix.status}</Label>
                  {fix.credits ?
                    <Label bsStyle="primary" className="pull-right">Creditos:{fix.credits}</Label>
                  : null}

                 </ListGroupItem>
      })
      return <ListGroup fill>
              {capsuleFixList}
             </ListGroup>
    }
  }
}



class CapsuleApprovedFixesList extends React.Component {
  toggleFixDev(fix) {
    this.props.toggleFixDev(fix)
  }
  render() {
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      self = this
      var capsuleFixList = this.props.fixes.map(function(fix, index){
          return <ListGroupItem key={index}>
                    <div className="capsule-fix-description">
                      {fix.description}
                    </div>
                    <div className="capsule-fix-stats">
                      <input type="checkbox" className="pull-right" checked={fix.to_dev} onChange={self.toggleFixDev.bind(this, fix)} />
                      <Label bsStyle="primary" className="pull-right">{fix.status}</Label>
                      {fix.credits ?
                      <Label bsStyle="primary" className="pull-right">Creditos:{fix.credits}</Label>
                      : null}
                    </div>
                 </ListGroupItem>
      })
      return <ListGroup fill>
              {capsuleFixList}
             </ListGroup>
    }
  }
}


class CapsuleApproved extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        show: false,
        fixCreditTotal: 0,
        misingCredits: null,
        token: null,
        amount: 0,
      }
  }
  showModal() {
    this.setState((prevState, props) => ({
      show: true
    }));
  }
  hideModal() {
    this.setState({
      show: false
    });
  }
  calculateCreditSum() {
    if (this.props.capsule.fixes){
      var fixCreditTotal = 0;
      for (f of this.props.capsule.fixes){
        if (f.to_dev){
          fixCreditTotal = fixCreditTotal + f.credits;
        }
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
  }
  componentDidMount(){
    this.calculateCreditSum();
  }
  render(){
    var title = <div className="half-width">
                  <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status} Cambios: {this.props.capsule.fixes.length}</p>
                </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible header={title} bsStyle="primary">
              <CapsuleApprovedFixesList
                key={this.props.capsule.id}
                fixes={this.props.capsule.fixes}
                calculateCreditSum={this.calculateCreditSum}
                toggleFixDev={this.props.toggleFixDev}
              />
              <p>Total Creditos: {this.state.fixCreditTotal ? this.state.fixCreditTotal : null}</p>
              <p>Tus Creditos: {this.props.customer ? this.props.customer.credits : null}</p>
              {this.state.misingCredits ?
                <p>Te faltan: {this.state.misingCredits} </p>
              : null}

              <Row>
                <Col>
                  <p>{this.state.total}</p>
                  <Button onClick={this.showModal.bind(this)} bsClass="btn btn-cta pull-right">
                      Acceptar Cambios
                  </Button>
                </Col>
              </Row>
              <Modal
                show={this.state.show}
                onHide={this.hideModal.bind(this)}
                dialogClassName="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">Enviar Capsula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Total: {this.state.fixCreditTotal ? this.state.fixCreditTotal : null}</p>
                  <p>Creditos: {this.props.customer ? this.props.customer.credits : null}</p>
                  <p>Te faltan: {this.state.misingCredits ? this.state.misingCredits : null } creditos</p>
                  <PaymentForm amount={0}></PaymentForm>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
             </Panel>
           </div>
  }
}


class CapsuleRequested extends React.Component{
  render() {
    var title = <div className="half-width">
                  <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible header={title} bsStyle="danger" bsSize="small">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}

class CapsuleDone extends React.Component{
  render(){
    var title = <div className="half-width">
                  <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible header={title} bsStyle="warning">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}


class CapsuleDevelopment extends React.Component{
  render() {
    const label = this.props.capsule.progress;
    var progressBar = <div>
                        <div className="half-width">
                          <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                          <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status} Cambios: {this.props.capsule.fixes.length}</p>
                        </div>
                        <div className="half-width">
                          <ProgressBar striped bsStyle="danger" now={this.props.capsule.progress}  label={`${label}%`} />
                        </div>
                      </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible defaultExpanded header={progressBar} bsStyle="success">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}


@observer
export default class ContainerCapsules extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(){
    capsulesActions.getCapsules()
    customerActions.getCustomer()
  }
  render(){
    var capsulesRequestedList = this.props.capsulesStore.filterByStatus("REQUESTED").map(capsule => {
      return <CapsuleRequested
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesApprovedList = this.props.capsulesStore.filterByStatus("APPROVED").map(capsule => {
      return <CapsuleApproved
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesDoneList = this.props.capsulesStore.filterByStatus("DONE").map(capsule => {
      return <CapsuleDone
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesDevelopmentList = this.props.capsulesStore.filterByStatus("DEVELOPMENT").map(capsule => {
      return <CapsuleDevelopment
              key={capsule.id}
              capsule={capsule}
              />
    })
    return <div className="row full-heigh">
            <div className="col-fix-list col-md-12">
              <div className="row">
                  {capsulesRequestedList}
                </div>
                <div className="row">
                  {capsulesApprovedList}
                </div>
                <div className="row">
                  {capsulesDevelopmentList}
                </div>
                <div className="row">
                  {capsulesDoneList}
                </div>
            </div>
           </div>
  }
}
