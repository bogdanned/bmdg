var React = require('react');
var ReactDOM = require('react-dom');
var Tether = require('react-tether');
var request = require('superagent');
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var cookie = require('react-cookie');
var FormGroup = require('react-bootstrap').FormGroup;
var HelpBlock = require('react-bootstrap').HelpBlock;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap'). FormControl;


var FormAddFix = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
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
      console.log('do validate');
      this.onSubmit();
    }
  },
  onSubmit: function(){
    console.log(this.refs)
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
          validationState={this.getValidationState()}>
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="<i class='ti-plus'></i>Necesito cambiar la imagen de fondo de la página 3 ..."
            onChange={this.handleChange}
            onSubmit={this.onSubmit}
            ref="input"
            onKeyPress={this._handleKeyPress}
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
      console.log(this.props.fix.id);
      this.props.deleteFix(this.props.fix);
    },
    editFix: function(e){
      e.preventDefault();
      console.log(this.props.fix.id);
    },
    render: function() {
      fix = this.props.fix;
      return <div class="fix-item">
              <div class="fix-item-description">
                <p class="p-item-description">{fix.description}</p>
                <p class="p-item-date">{fix.created} {fix.status}</p>
              </div>
              <div class="pull-right">
                <i class='ti-pencil-alt' onClick={this.editHandle} />
                <i class='ti-close icon-close' onClick={this.deleteHandle} />
              </div>
             </div>
    }
});

var FixList = React.createClass({
    render: function() {
        console.log(this.props.fixes.length);
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
                   />
          })
          return <div>
                  {namesList}
                  <button class="btn btn-cta pull-right">Enviar Capsula</button>
                 </div>
      }
    }
});



var FixesContainer = React.createClass({
  getInitialState: function(){
    return {
      fixes: [],
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
  updateFix: function(fix){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request
      .put("api/smallfixes/" + fix.id + "/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
        self.setState({fixes: JSON.parse(res.text)});
      });
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
    return <div class="row">
              <div class="col-md-12">
                <FormAddFix getFixesList={this.getFixesList}/>
              </div>
              <div class="col-md-12">
                <FixList
                  fixes={this.state.fixes}
                  deleteFix={this.deleteFix}
                  updateFix={this.updateFix}
                />
              </div>
            </div>

  },
})



/* Rendering Container Form */
ReactDOM.render(
  <FixesContainer/>,
	document.getElementById('container-request-fix')
)
