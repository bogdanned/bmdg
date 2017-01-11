import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { Dropzone } from 'react-dropzone'
import { Col,
         Row,
         ProgressBar,
         Modal,
         Button,
         FieldGroup,
       } from 'react-bootstrap'



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
   value = this.refs.fixInput.props.value
   csrftoken = cookie.load('csrftoken');
   self = this;
   request.post("api/smallfixes/")
          .send({description: value})
          .set('Accept', 'application/json')
          .set("X-CSRFToken", csrftoken)
          .end(function(err, res){
            if (res.status="201"){
              self.clearInput();
              self.props.getFixesList();
            }
          })
  }
 render() {
   var variable = true;
   return (
     <form>
       <FormGroup
         controlId="formBasicText"
         validationState={ this.getValidationState() }>
         <ControlLabel bsClass="add-fix-label">Introduce tus necesidades de desarrollo:</ControlLabel>
         <FormControl
           type="text"
           value={ this.state.value }
           placeholder="Necesito cambiar la imagen de fondo de la página 3 ..."
           onChange={ this.handleChange }
           onSubmit={ this.onSubmit }
           ref="input"
           onKeyPress={ this._handleKeyPress }
           ref="fixInput"
         />
       </FormGroup>
     </form>
   );
 }
}


export default class ContainerFixes extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      fixes: [],
      wd_col_list: 12,
      wd_edit_form: 0,
      selectedFix: null,
    }
  }
  //Only the ones with status Requested
  getFixesList(){
  }
  displayFixEditForm(fix){
    this.setState(
      {
        wd_col_list: 9,
        wd_edit_form: 3,
        selectedFix: fix,
      }
    );
  }
  hideFixEditForm(fix){
    this.setState(
      {
        wd_col_list: 12,
        wd_edit_form: 0,
        selectedFix: null,
      }
    );
  }
  //returns boostrap status
  updateFix(fix){
    csrftoken = cookie.load('csrftoken')
    self = this
    request
      .put("api/smallfixes/" + fix.id + "/")
      .set("X-CSRFToken", csrftoken)
      .send({description: fix.description })
      .set('Accept', 'application/json')
      .end(function(err, res){
      });
  }
  //updates the selected fix but it does
  updateSelectedFix(fix_description){
    var fix = this.state.selectedFix
    fix.description = fix_description
    this.setState(
      { selectedFix: fix}
    );
  }
  //when an attachment is added: re-render all components
  refreshSelectedFix(){
      var fix = this.state.selectedFix
      csrftoken = cookie.load('csrftoken')
      self = this
      request
        .get("api/smallfixes")
        .query({ status: 'REQUESTED' })
        .set('Accept', 'application/json')
        .end(function(err, res){
          var new_fixes =  JSON.parse(res.text);
          request.get("api/smallfixes/" + fix.id + "/")
                 .set("X-CSRFToken", csrftoken)
                 .send({description: fix.description })
                 .set('Accept', 'application/json')
                 .end(function(err, res){
                   self.setState({
                     selectedFix: JSON.parse(res.text),
                     fixes: new_fixes,
                   })
                 });
          })
  }
  deleteFix(fix) {
    csrftoken = cookie.load('csrftoken')
    self = this
    request
      .del("api/smallfixes/" + fix.id + "/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
        self.getFixesList();
      });
  }
  addFix(fix){
    csrftoken = cookie.load('csrftoken')
    self = this
    request
      .post("api/smallfixes/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
        self.setState({fixes: JSON.parse(res.text)});
      });
  }
  componentDidMount(){
    this.getFixesList()
  }
  render() {
    return <div class="row full-heigh">
            <Col md={this.state.wd_col_list} class="col-fix-list">
                <div class="col-md-12">
                  <FormAddFix
                    getFixesList={this.getFixesList}
                    fixes={this.state.fixes}
                  />
                </div>
                <div class="col-md-12">
                  <FixList
                    fixes={this.state.fixes}
                    deleteFix={this.deleteFix}
                    updateFix={this.updateFix}
                    displayFixEditForm={this.displayFixEditForm}
                    getFixesList={this.getFixesList}
                  />
                </div>
                <div class="col-md-12">
                </div>
              </Col>
              <FixEditForm
                selectedFix={this.state.selectedFix}
                updateFix={this.updateFix}
                hideFixEditForm={this.hideFixEditForm}
                wd_edit_form={this.state.wd_edit_form}
                updateSelectedFix={this.updateSelectedFix}
                getFixesList={this.getFixesList}
                refreshSelectedFix={this.refreshSelectedFix}
              />
          </div>
  }
}
