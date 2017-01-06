var React = require('react');
var ReactDOM = require('react-dom');
var Tether = require('react-tether');
var request = require('superagent');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var cookie = require('react-cookie');
var Col = require('react-bootstrap').Col;
var FormGroup = require('react-bootstrap').FormGroup;
var HelpBlock = require('react-bootstrap').HelpBlock;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Modal = require('react-bootstrap').Modal;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var FieldGroup = require('react-bootstrap').FieldGroup;
var Dropzone = require('react-dropzone');


var FixEditAttachments = React.createClass({
  deleteAttachment: function(file, e){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request
      .del("/api/smallfixes/attachments/" + file.id + "/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
          console.log("get fixes");
          console.log(self.props.refreshSelectedFix);
          self.props.refreshSelectedFix();
      });
  },
  render: function(){
    if (this.props.selectedFix.files.length && this.props.selectedFix.files.length > 0){
      self = this;
      var attachmentsList = this.props.selectedFix.files.map(function(file, index){
        return <p key={file.id} class="attachment-tag">{file.file_name}
                  <i class='ti-close icon-close pull-right' onClick={self.deleteAttachment.bind(self, file)}/>
                </p>
      }, self)
      return <div>
                <span class="attachment-title">Adjuntos</span>
                <i class="ti-cloud-up" />
               {attachmentsList}
             </div>
    }else{
      return <p></p>
    }
  }
})


var FormAddFix = React.createClass({
  getInitialState: function() {
      return {value: ''}
  },
  clearInput: function() {
    this.setState({ value: '' });
  },
  getValidationState: function() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },
  handleChange: function(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  },
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmit();
    }
  },
  onSubmit: function(){
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
  },
  render: function() {
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
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
});



var FormAddFixAttachment = React.createClass({
  getInitialState: function(){
    return { files: null }
  },
  onSubmit: function(){
    csrftoken = cookie.load('csrftoken');
    self = this;
    var files = this.state.files;
    this.sendFiles(files);
  },
  sendFiles: function(files){
    self = this;
    req = request.post("/attachments/add")
    for (var i = 0; i < this.state.files.length; i++){
      file=files[i]
      req.attach(file.name, file)
    }
    req.field('fix_id', this.props.selectedFix.id)
    req.set("X-CSRFToken", csrftoken)
    req.end(function(err, res){
      self.props.refreshSelectedFix();
    })
  },
  onDrop: function(files) {
    this.setState({
      files: files,
    });
  },
  render: function() {
    return (
        <div>
          <Dropzone onDrop={this.onDrop} className="drop-zone">
          {this.state.files ? (
            fileList = this.state.files.map(function(file, index){
              return <p class="attachment-tag" key={file.lastModified}>{file.name}</p>
            })
          ) : <p class="attachment-tag">Añadir Adjunto</p>}
          </Dropzone>
          <br/>
          <Button onClick={this.onSubmit} bsClass="btn btn-cta pull-right">
              Enviar
          </Button>
        </div>
    )
  }
});


var FixElement = React.createClass({
    deleteHandle: function(e){
      e.preventDefault();
      this.props.deleteFix(this.props.fix);
    },
    editFix: function(e){
      e.preventDefault();
    },
    selectFix: function(e){
      e.preventDefault();
      this.props.displayFixEditForm(this.props.fix);
    },
    render: function() {
      fix = this.props.fix;
      return <div class="fix-item" >
              <div class="row fix-item-description" onClick={this.selectFix}>
                <p class="p-item-description">{fix.description}</p>
                <p class="p-item-date">{fix.created} {fix.status}   </p>
              </div>
              <div class="pull-right">
                <i class="ti-files" onClick={this.selectFix}/>
                {fix.files.length}
                <i class='ti-pencil-alt' onClick={this.selectFix} />
                <i class='ti-close icon-close' onClick={this.deleteHandle} />
              </div>
             </div>
    }
});

var FixList = React.createClass({
    getInitialState: function() {
      return {show: false};
    },
    sendCapsule: function(){
      var capsule = {
           "status": "REQUESTED",
           "fixes": this.props.fixes,
       }
       csrftoken = cookie.load('csrftoken');
       self = this;
       request.post("/api/capsules/")
              .set("X-CSRFToken", csrftoken)
              .set('Accept', 'application/json')
              .send(capsule)
              .end(function(err, res){
                self.hideModal();
                self.props.getFixesList();
              });
    },
    showModal: function() {
      this.setState({show: true});
    },
    hideModal: function() {
      this.setState({show: false});
    },
    render: function() {
        if (this.props.fixes.length == 0){
          return <p></p>
        } else {
          self = this;
          var namesList = this.props.fixes.map(function(fix, index){
            return <FixElement
                      key={fix.id}
                      fix={fix}
                      updateFix={self.props.updateFix}
                      deleteFix={self.props.deleteFix}
                      displayFixEditForm={self.props.displayFixEditForm}
                   />
          })
          return <div>
                  {namesList}
                  <ButtonToolbar>
                    <Button bsClass="btn btn-primary btn-cta pull-right" onClick={this.showModal}>
                      Eviar Cambios
                    </Button>
                    <Modal
                      show={this.state.show}
                      onHide={this.hideModal}
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
                        <Button onClick={this.hideModal} bsClass="btn btn-alert btn-cta pull-left">Cerrar</Button>
                        <Button onClick={this.sendCapsule}  bsClass="btn btn-primary btn-cta pull-right">Enviar Cambios</Button>
                      </Modal.Footer>
                    </Modal>
                  </ButtonToolbar>
                </div>
      }
    }
});



var FixEditForm =  React.createClass({
  getInitialState: function() {
    if (this.props.selectedFix){
      return { value: this.props.selectedFix.description}
    }else{
      return { value: ''}
    }
  },
  getValidationState: function() {
    var length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },
  _handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmit();
    }
  },
  onSubmit: function(){
    value = this.refs.fixEditInput.props.value;
    csrftoken = cookie.load('csrftoken');
    this.props.selectedFix.description = value;
    status = this.props.updateFix(this.props.selectedFix);
  },
  handleChange: function(e){
    e.preventDefault();
    this.props.updateSelectedFix(e.target.value);
  },
  componentDidMount: function() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  },
  componentWillUnmount: function() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  },
  handleClickOutside: function(e) {
   var domNode = ReactDOM.findDOMNode(this);
   if ((!domNode || !domNode.contains(event.target))) {
     this.props.hideFixEditForm();
   }
  },
  render: function(){
    var self = this;
    if (this.props.selectedFix){
      return  <Col md={self.props.wd_edit_form} class="col-edit-fix">
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
              </Col>
    } else {
      return null
    }
  }
})


var FixesContainer = React.createClass({
  getInitialState: function(){
    return {
      fixes: [],
      wd_col_list: 12,
      wd_edit_form: 0,
      selectedFix: null,
    }
  },
  //Only the ones with status Requested
  getFixesList: function(){
      self = this;
      request
        .get("api/smallfixes")
        .set('Accept', 'application/json')
        .query({ status: 'REQUESTED' })
        .end(function(err, res){
          console.log(JSON.parse(res.text));
          self.setState({
            fixes: JSON.parse(res.text),
          });
      });
  },
  displayFixEditForm: function(fix){
    this.setState(
      {
        wd_col_list: 9,
        wd_edit_form: 3,
        selectedFix: fix,
      }
    );
  },
  hideFixEditForm: function(fix){
    this.setState(
      {
        wd_col_list: 12,
        wd_edit_form: 0,
        selectedFix: null,
      }
    );
  },
  //returns boostrap status
  updateFix: function(fix){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request
      .put("api/smallfixes/" + fix.id + "/")
      .set("X-CSRFToken", csrftoken)
      .send({description: fix.description })
      .set('Accept', 'application/json')
      .end(function(err, res){
      });
  },
  //updates the selected fix but it does
  updateSelectedFix: function(fix_description){
    var fix = this.state.selectedFix;
    fix.description = fix_description;
    this.setState(
      { selectedFix: fix}
    );
  },
  //when an attachment is added: re-render all components
  refreshSelectedFix: function(){
      var fix = this.state.selectedFix;
      csrftoken = cookie.load('csrftoken');
      self = this;
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
  },
  deleteFix: function(fix){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request
      .del("api/smallfixes/" + fix.id + "/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
        self.getFixesList();
      });
  },
  addFix: function(fix){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request
      .post("api/smallfixes/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
        self.setState({fixes: JSON.parse(res.text)});
      });
  },
  componentDidMount: function(){
    this.getFixesList();
  },
  render: function() {
    return <div class="row full-heigh">
            <Col md={this.state.wd_col_list} class="col-fix-list">
                <div class="col-md-12">
                  <FormAddFix getFixesList={this.getFixesList}/>
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
  },
})



/* Rendering Container Form */
ReactDOM.render(
  <FixesContainer />,
	document.getElementById('container-request-fix')
)
