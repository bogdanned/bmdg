import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as fixesActions from '../actions/fixesActions'
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
import { ContainerFixEdit } from './containerFixEdit'


@observer
class FixElement extends React.Component{
   deleteHandle(e){
     e.preventDefault()
     fixesActions.deleteFix(this.props.fix)
   }
   editFix(e){
     e.preventDefault()
     fixesActions.selectFix(this.props.fix)
   }
   selectFix(e){
     e.preventDefault()
     fixesActions.selectFix(this.props.fix)
   }
   render() {
     if (this.props.fix){
       if(this.props.fixesStore.selected_fix){
         if (this.props.fix.id === this.props.fixesStore.selected_fix.id){
           var class_active=true
         }
       }
       var fix = this.props.fix
       return <div className={"fix-item " + (class_active ? "fix-active" : null)}>
               <div className="row fix-item-description" onClick={this.selectFix.bind(this)}>
                 <p className="p-item-description">{fix.description}</p>
                 <p className="p-item-date">{fix.created} {fix.status}   </p>
               </div>
               <div className="pull-right">
                 <i className="ti-files" onClick={this.selectFix.bind(this)}/>
                 {fix.files.length}
                 <i className='ti-pencil-alt' onClick={this.selectFix.bind(this)} />
                 <i className='ti-close icon-close' onClick={this.deleteHandle.bind(this)} />
               </div>
              </div>
     }else{
       return null
     }
   }
}


class FixList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {show: false}
  }
  sendCapsule(){
   var capsule = {
        "status": "REQUESTED",
        "fixes": this.props.fixes,
    }
    csrftoken = cookie.load('csrftoken');
    self = this;
  }
  showModal() {
   this.setState({show: true});
  }
  hideModal() {
   this.setState({show: false});
  }
  render() {
     if (this.props.fixes.length == 0){
       return <p></p>
     } else {
       self = this;
       var fixesList = this.props.fixes.map(fix => {
         return <FixElement
                   key={fix.id}
                   fix={fix}
                   updateFix={self.props.updateFix}
                   deleteFix={self.props.deleteFix}
                   fixesStore={this.props.fixesStore}
                   displayFixEditForm={self.props.displayFixEditForm}
                />
       })
       return <div>
               {fixesList}
               <ButtonToolbar>
                 <Button bsClass="btn btn-primary btn-cta pull-right" onClick={this.showModal.bind(this)}>
                   Eviar Cambios
                 </Button>
                 <Modal
                   show={this.state.show}
                   onHide={this.hideModal.bind(this)}
                   dialogClassName="custom-modal"
                 >
                   <Modal.Header closeButton>
                     <Modal.Title id="contained-modal-title-lg">Enviar Capsula</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <h4>¿Estas Seguro?</h4>
                     <p>Has añadido {this.props.fixes.length} cambios. Los cambios serán revisados por nuestros
                     desarrollos en un plazo de <strong>24 horas</strong>
                     y recibiras un mail con la estimación de creditos.</p>
                   </Modal.Body>
                   <Modal.Footer>
                     <Button onClick={this.hideModal.bind(this)} bsClass="btn btn-alert btn-cta pull-left">Cerrar</Button>
                     <Button onClick={this.sendCapsule}  bsClass="btn btn-primary btn-cta pull-right">Enviar Cambios</Button>
                   </Modal.Footer>
                 </Modal>
               </ButtonToolbar>
             </div>
   }
  }
}


@observer
class FormAddFix extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      limit_reached: false,
    }
  }
  getValidationState() {
   const length = this.state.value.length;
   if (length > 10) return 'success';
   else if (length > 5) return 'warning';
   else if (length > 0) return 'error';
  }
  handleChange(e) {
   e.preventDefault();
   this.setState({ value: e.target.value });
  }
  _handleKeyPress(e) {
   if (e.key === 'Enter') {
     e.preventDefault();
     this.onSubmit();
   }
  }
  onSubmit(){
   const value = this.state.value
   fixesActions.addFix({
     'description': value
   })
   this.setState({
     value: '',
   });
  }
  render() {
   var limit_reached = this.props.fixesStore.limit_reached()
   return (
     <form>
       <FormGroup
         controlId="formBasicText"
         validationState={ this.getValidationState() }>
         <ControlLabel className="add-fix-label">Introduce tus necesidades de desarrollo:</ControlLabel>
         <FormControl
           type="text"
           value={ this.state.value }
           placeholder="Necesito cambiar la imagen de fondo de la página 3 ..."
           onChange={ this.handleChange.bind(this) }
           onSubmit={ this.onSubmit.bind(this) }
           ref="input"
           onKeyPress={ this._handleKeyPress.bind(this) }
           ref="fixInput"
           disabled={limit_reached}
         />
         {limit_reached ?
           <HelpBlock>Se peuden enviar como maximo 5 cambios</HelpBlock>
         : <HelpBlock></HelpBlock>}

       </FormGroup>
     </form>
   );
 }
}


@observer
export default class ContainerFixes extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      wd_col_list: 12,
      wd_edit_form: 0,
    }
  }
  componentWillMount(){
    fixesActions.getFixes()
  }
  render() {
    if (this.props.fixesStore.selected_fix){
      var wd_col_list = 9
      var wd_edit_form = 3
    }else{
      var wd_col_list = 12
      var wd_edit_form = 0
    }
    return <div className="container">
            <Row className="full-heigh">
              <Col md={wd_col_list} className="col-fix-list">
                  <Row>
                    <FormAddFix
                     fixesStore={this.props.fixesStore}
                    />
                  </Row>
                  <Row>
                    <FixList
                      fixes={this.props.fixesStore.filterByStatus("REQUESTED")}
                      displayFixEditForm={this.displayFixEditForm}
                      fixesStore={this.props.fixesStore}
                    />
                  </Row>
                </Col>
                <Col md={wd_edit_form}>
                  <ContainerFixEdit
                    fixesStore={this.props.fixesStore}
                    hideFixEditForm={this.hideFixEditForm}
                    showFixEditForm={this.showFixEditForm}
                  />
                </Col>
              </Row>
            </div>
  }
}
