import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import Dropzone from 'react-dropzone'
import { Col,
         Row,
         Panel,
         ListGroup,
         ListGroupItem,
         Label,
         ProgressBar,
         Modal,
         Button,
         FormGroup,
         ControlLabel,
         FormControl,
         HelpBlock,
       } from 'react-bootstrap'
import * as fixesActions from '../actions/fixesActions'
import * as attachmentsActions from '../actions/attachmentsActions'


@observer
class FixEditAttachments extends React.Component{
    deleteAttachment(file){
      attachmentsActions.deleteAttachment(this.props.selected_fix, file)
    }
    render(){
      if (this.props.selected_fix.files.length && this.props.selected_fix.files.length > 0){
        self = this;
        var attachmentsList = this.props.selected_fix.files.map(function(file, index){
          return <p key={file.id} className="attachment-tag">{file.file_name}
                     <i className='ti-close icon-close pull-right' onClick={this.deleteAttachment.bind(this, file)}/>
                   </p>
        }, self)
        return <div>
                   <span className="attachment-title">Adjuntos</span>
                   <i className="ti-cloud-up" />
                   {attachmentsList}
                </div>
       }else{
         return <p></p>
       }
     }
  }


class FormAddFixAttachment extends React.Component{
    constructor(props) {
     super(props)
     this.state = { files: null }
    }
    onSubmit(){
      attachmentsActions.addAttachment(this.props.selected_fix, this.state.files)
    }
    onDrop(files) {
      this.setState({
        files: files,
      })
    }
    render() {
      var fileList = [];
      return (
          <Col md={12}>
          <Dropzone onDrop={this.onDrop.bind(this)} className="drop-zone">
          {this.state.files ? (
            this.state.files.map(function(file, index){
              return <p className="attachment-tag" key={file.lastModified}>{file.name}</p>
            })
          ) : <p className="attachment-tag">Añadir Adjunto</p>}
          </Dropzone>
          <br/>
            <Button onClick={this.onSubmit.bind(this)} bsClass="btn btn-cta pull-right">
                Enviar
            </Button>
          </Col>
        )
    }
}

@observer
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
   this.props.selected_fix.description = value;
   status = this.props.updateFix(this.props.selected_fix);
 }
 handleChange(e){
   e.preventDefault();
   this.props.updateselected_fix(e.target.value);
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
    fixesActions.selectFix(null)
  }
 }
 render(){
   var self = this;
   if (this.props.fixesStore.selected_fix){
     return  <Row className="col-edit-fix">
               <form>
                   <FormGroup controlId="formEditfix">
                   <ControlLabel>Descripción</ControlLabel>
                   <FormControl
                     componentClass="textarea"
                     type="text"
                     value={this.props.fixesStore.selected_fix.description}
                     onChange={this.handleChange.bind(this)}
                     onSubmit={this.onSubmit.bind(this)}
                     onKeyPress={this._handleKeyPress.bind(this)}
                     ref="fixEditInput"
                   />
                   <FormControl.Feedback />
                   <HelpBlock>Pulsa enter para guardar los cambios.</HelpBlock>
                 </FormGroup>
               </form>
               <FixEditAttachments
                 selected_fix={this.props.fixesStore.selected_fix}
               />
               <FormAddFixAttachment
                  selected_fix={this.props.fixesStore.selected_fix}
               />
             </Row>
   } else {
     return null
   }
 }
}


export { ContainerFixEdit }
