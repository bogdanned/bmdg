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
  onSubmit(){
    console.log('submit')
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
                 onChange={this.onChangeName.bind(this)}
                 >
                  <ControlLabel>
                   Nombre:
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
                   <FormGroup controlId="">
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
                    <FormGroup controlId="">
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
                     <FormGroup controlId="">
                       <ControlLabel>
                        Adress:
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
                       className="btn btn-primary pull-right"
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
