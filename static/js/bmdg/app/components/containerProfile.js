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


class FormProfileEdit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      sur_name: '',
      email: '',
      nif: '',
    }
  }
  onChangeName(e) {
    e.preventDefault()
    this.setState(
      {name: e.target.value}
    )
  }
  render(){
    return <form>
             <Col md={5}>
               <FormGroup
                controlId="FormProfileEdit"
                onChange={this.onChangeName.bind(this)}
                >
                 <ControlLabel>
                  Nombre:
                 </ControlLabel>
                 <FormControl
                   type="text"
                   value={ this.state.name }
                   placeholder="Nombre"
                   ref="name" />
               </FormGroup>
              </Col>

              <Col md={5}>
                <FormGroup controlId="">
                  <ControlLabel >
                   Nombre:
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={ this.state.sur_name }
                    placeholder="Apellido"
                    ref="sur_name" />
                </FormGroup>
               </Col>


               <Col md={5}>
                 <FormGroup controlId="">
                   <ControlLabel>
                    Nombre:
                   </ControlLabel>
                   <FormControl
                     type="text"
                     value={ this.state.email }
                     placeholder="Email"
                     ref="email" />
                 </FormGroup>
                </Col>

                <Col md={5}>
                  <FormGroup controlId="">
                    <ControlLabel>
                     Nombre:
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={ this.state.nif }
                      placeholder="NIF"
                      ref="nif" />
                  </FormGroup>
                 </Col>


           </form>
  }
}

export default class ContainerProfile extends React.Component{
    render(){
      return <Row>
              <Col md={12}>
              <h2>Mi Perfil</h2>
              </Col>
              <Col md={12}>
              <FormProfileEdit />
              </Col>
             </Row>
    }
}
