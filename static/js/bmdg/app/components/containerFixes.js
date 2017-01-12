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


class FixElement extends React.Component{
   deleteHandle(e){
     e.preventDefault()
     fixesActions.deleteFix(this.props.fix)
   }
   editFix(e){
     e.preventDefault()
     this.props.displayFixEditForm(this.props.fix)
   }
   selectFix(e){
     e.preventDefault()
     this.props.displayFixEditForm(this.props.fix)
   }
   render() {
     console.log(this.props)
     if (this.props.fix){
       if(this.props.fixesStore.selected_fix){
         if (this.props.fix.id === this.props.fixesStore.selected_fix.id){
           var class_active="fix-item fix-active"
         }else{
           var class_active="fix-item"
         }
       }
       var fix = this.props.fix
       return <div  className={class_active}>
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


class FormAddFix extends React.Component{
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }
  clearInput() {
   this.setState({ value: '' });
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
  }
 render() {
   var variable = true;
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
         />
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
    this.displayFixEditForm = this.displayFixEditForm.bind(this)
    this.hideFixEditForm = this.hideFixEditForm.bind(this)
  }
  displayFixEditForm(fix){
    this.props.fixesStore.selected_fix = fix
    this.setState(
      {
        wd_col_list: 9,
        wd_edit_form: 3,
      }
    )
  }
  hideFixEditForm(){
    this.props.fixesStore.selected_fix = null
    this.setState(
      {
        wd_col_list: 12,
        wd_edit_form: 0,
      }
    )
  }
  componentWillMount(){
    fixesActions.getFixes()
  }
  render() {
    return <Row className="full-heigh">
            <Col md={this.state.wd_col_list} className="col-fix-list">
                <Row>
                  <FormAddFix/>
                </Row>
                <Row>
                  <FixList
                    fixes={this.props.fixesStore.filterByStatus("REQUESTED")}
                    displayFixEditForm={this.displayFixEditForm}
                    fixesStore={this.props.fixesStore}
                  />
                </Row>
              </Col>
              <Col md={this.state.wd_edit_form}>
                <ContainerFixEdit
                  hideFixEditForm={this.hideFixEditForm}
                  fixesStore={this.props.fixesStore}
                />
              </Col>
            </Row>

  }
}
