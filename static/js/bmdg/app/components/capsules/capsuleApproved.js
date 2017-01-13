import React from 'react'
import ReactDOM from 'react-dom'
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


export default class CapsuleApproved extends React.Component{
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
