import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { Col,
         Row,
         ProgressBar,
         Modal,
         Button,
         FieldGroup,
         Form,
         FormGroup,
         HelpBlock,
         FormControl,
         ControlLabel,
         ButtonToolbar } from 'react-bootstrap'
import { customerStore } from '../stores/customerStore'
import * as  customerActions from '../actions/customerActions'


@observer
class FormProfileEdit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      disabled: true,
    }
  }
  enableSubmit(){
    this.setState({
      disabled: false,
    })
  }
  onChangeName(e) {
    e.preventDefault()
    customerStore.changeName(e.target.value)
    this.enableSubmit()
  }
  onChangeWeb(e) {
    e.preventDefault()
    customerStore.changeWeb(e.target.value)
    this.enableSubmit()
  }
  onChangeEmail(e) {
    e.preventDefault()
    customerStore.changeEmail(e.target.value)
    this.enableSubmit()
  }
  onChangeNif(e) {
    e.preventDefault()
    customerStore.changeNif(e.target.value)
    this.enableSubmit()
  }
  onChangeAddress(e) {
    e.preventDefault()
    customerStore.changeAddress(e.target.value)
    this.enableSubmit()
  }
  onSubmit(){
    customerActions.saveCustomer(customerStore.customer)
  }
  render(){
    return <form>
            <Row>
             <Col md={6}>
               <FormGroup
                controlId="FormProfileEdit"
                onChange={this.onChangeName.bind(this)}
                >
                <h3>{customerStore.customer.name} {customerStore.customer.last_name}</h3>
                 <ControlLabel>
                  Nombre:
                 </ControlLabel>
                 <FormControl
                   type="text"
                   placeholder="Nombre"
                   value = { customerStore.customer.name }
                  />
               </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup
                 controlId="FormProfileWeb"
                 onChange={this.onChangeWeb.bind(this)}
                 >
                  <ControlLabel>
                   Web:
                  </ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Web"
                    value = { customerStore.customer.web }
                   />
                </FormGroup>
               </Col>
              </Row>

              <Row>
                 <Col md={6}>
                   <FormGroup
                    controlId=""
                    onChange={this.onChangeEmail.bind(this)}
                    >
                     <ControlLabel>
                      Email:
                     </ControlLabel>
                     <FormControl
                       type="text"
                       value={ customerStore.customer.email }
                       placeholder="Email"
                       ref="email" />
                   </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup
                      controlId=""
                      onChange={this.onChangeNif.bind(this)}
                      >
                      <ControlLabel>
                       NIF:
                      </ControlLabel>
                      <FormControl
                        type="text"
                        value={ customerStore.customer.nif }
                        placeholder="NIF"
                        ref="nif" />
                    </FormGroup>
                   </Col>
                 </Row>

                 <Row>
                   <Col md={6}>
                     <FormGroup
                        controlId=""
                        onChange={this.onChangeAddress.bind(this)}
                        >
                       <ControlLabel>
                        Dirección:
                       </ControlLabel>
                       <FormControl
                         bsSize="small"
                         type="text"
                         value={ customerStore.customer.adress }
                         placeholder="Adress"
                         ref="nif" />
                     </FormGroup>
                     <Button
                       disabled ={this.state.disabled ? true : false }
                       className="btn btn-primary btn-cta pull-right"
                       onClick={this.onSubmit.bind(this)}
                       >Guardar</Button>
                    </Col>
                  </Row>
           </form>
  }
}


@observer
export default class ContainerProfile extends React.Component{
    render(){
      return <div className="container">
              <Row>
                <Col md={12}>
                  <FormProfileEdit />
                </Col>
              </Row>
            </div>
    }
}
