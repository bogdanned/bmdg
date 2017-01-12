import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { Dropzone } from 'react-dropzone'
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



class FormAddFixAttachment extends React.Component{
 constructor(props) {
   super(props)
   this.state = { files: null }
 }
onSubmit(){
  fixesActions.addFiles(this.props.fix, this.state.files)
}
onDrop(files) {
  this.setState({
    files: files,
  })
}
render() {
  return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)} className="drop-zone">
        {this.state.files ? (
          fileList = this.state.files.map(function(file, index){
            return <p className="attachment-tag" key={file.lastModified}>{file.name}</p>
          })
        ) : <p className="attachment-tag">Añadir Adjunto</p>}
        </Dropzone>
        <br/>
        <Button onClick={this.onSubmit.bind(this)} bsClass="btn btn-cta pull-right">
            Enviar
        </Button>
      </div>
    )
  }
}


export default class ContainerFixEdit extends React.Component{
 getValidationState(){
   var length = this.state.value.length;
   if (length > 10) return 'success';
   else if (length > 5) return 'warning';
   else if (length > 0) return 'error';
 }
 _handleKeyPress(e) {
   if (e.key === 'Enter') {
     e.preventDefault();
     this.onSubmit();
   }
 }
 onSubmit(){
   value = this.refs.fixEditInput.props.value;
   csrftoken = cookie.load('csrftoken');
   this.props.selectedFix.description = value;
   status = this.props.updateFix(this.props.selectedFix);
 }
 handleChange(e){
   e.preventDefault();
   this.props.updateSelectedFix(e.target.value);
 }
 componentDidMount() {
   document.addEventListener('click', this.handleClickOutside.bind(this), true);
 }
 componentWillUnmount() {
     document.removeEventListener('click', this.handleClickOutside.bind(this), true);
 }
 handleClickOutside(e) {
  var domNode = ReactDOM.findDOMNode(this);
  if ((!domNode || !domNode.contains(event.target))) {
    this.props.hideFixEditForm();
  }
 }
 render(){
   var self = this;
   if (this.props.selectedFix){
     return  <Row class="col-edit-fix">
               <form>
                   <FormGroup controlId="formEditfix">
                   <ControlLabel>Descripción</ControlLabel>
                   <FormControl
                     componentClass="textarea"
                     type="text"
                     value={this.props.selectedFix.description}
                     onChange={this.handleChange}
                     onSubmit={this.onSubmit}
                     onKeyPress={this._handleKeyPress}
                     ref="fixEditInput"
                   />
                   <FormControl.Feedback />
                   <HelpBlock>Pulsa enter para guardar los cambios.</HelpBlock>
                 </FormGroup>
               </form>
               <FixEditAttachments
                 selectedFix={this.props.selectedFix}
                 getFixesList={this.props.getFixesList}
                 updateSelectedFix={this.updateSelectedFix}
                 refreshSelectedFix={this.props.refreshSelectedFix}
               />
               <FormAddFixAttachment
                 updateSelectedFix={this.updateSelectedFix}
                 selectedFix={this.props.selectedFix}
                 getFixesList={this.props.getFixesList}
                 refreshSelectedFix={this.props.refreshSelectedFix}
               />
             </Row>
   } else {
     return null
   }
 }
}
