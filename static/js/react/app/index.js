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
          <ControlLabel bsClass="add-fix-label">Introduce las tareas de desarrollo:</ControlLabel>
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
                <p class="p-item-date">{fix.created} {fix.status}</p>
              </div>
              <div class="pull-right">
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
    showModal: function() {
      this.setState({show: true});
    },
    hideModal: function() {
      this.setState({show: false});
    },
    render: function() {
        if (this.props.fixes.length == 0){
          return <p>Añade una tarea ...</p>
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
                      Eviar Capsula
                    </Button>

                    <Modal
                      {...this.props}
                      show={this.state.show}
                      onHide={this.hideModal}
                      dialogClassName="custom-modal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h4>¿Estas Seguro?</h4>
                        <p>Ipsum molestiae natus adipisci modi eligendi?
                        Debitis amet quae unde commodi aspernatur enim,
                        consectetur. Cumque deleniti temporibus ipsam
                        atque a dolores quisquam quisquam adipisci possimus
                         laboriosam. Quibusdam facilis doloribus debitis!
                         Mollitia reiciendis porro quo magni inc</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.hideModal} bsStyle="primary" bsClass="pull-right btn-cta">Cerrar</Button>
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
    this.props.updateSeletedFix(e.target.value);
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
                    <h3>Editar Request</h3>
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
  getFixesList: function(){
      self = this;
      request
        .get("api/smallfixes")
        .set('Accept', 'application/json')
        .end(function(err, res){
          self.setState({fixes: JSON.parse(res.text)});
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
        self.getFixesList();
      });
  },
  //updates the selected fix but it does
  updateSeletedFix: function(fix_description){
    var fix = this.state.selectedFix;
    fix.description = fix_description;
    this.setState(
      { selectedFix: fix}
    );
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
                  />
                </div>
              </Col>
              <FixEditForm
                selectedFix={this.state.selectedFix}
                updateFix={this.updateFix}
                hideFixEditForm={this.hideFixEditForm}
                wd_edit_form={this.state.wd_edit_form}
                updateSeletedFix={this.updateSeletedFix}
              />
          </div>
  },
})



/* Rendering Container Form */
ReactDOM.render(
  <FixesContainer />,
	document.getElementById('container-request-fix')
)
