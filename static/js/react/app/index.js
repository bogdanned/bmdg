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
            placeholder="Necesito cambiar la imagen de fondo de la página 3 ..."
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



var FixesList = React.createClass({
  componentDidMount: function() {
    this.props.getFixesList();
  },
  afterSaveCell: function(row, cellName, cellValue){
    // Update
    console.log(row);
    console.log(cellName);
    console.log(cellValue);
    this.props.updateFix(row);
  },
  handleInsertedRow: function(row) {
    console.log(row);
    this.props.addFix(row);
  },
  getInitialState: function(){
    return {
      selectRowProp: {
        mode: 'checkbox'
      },
      cellEdit: {
        mode: 'click',
        afterSaveCell: this.afterSaveCell,
      },
      tableStyle: {
        borderRadius: '6px',
        boxShadow: '0 2px 2px rgba(204, 197, 185, 0.5)',
        backgroundColor: '#FFFFFF',
        color: '#252422',
        marginBottom: '20px',
        position: 'relative',
        zIndex: '1',
      },
      headerStyle: {
        backgroundColor: '#FFFFFF',
        color: '#252422',
        position: 'relative',
        border: "none",
      },
      options: {
        afterInsertRow: this.handleInsertedRow,
        noDataText: 'This is custom text for empty data',
      }
    }
  },
  render: function() {
    return (
      <BootstrapTable data={ this.props.fixes }
                      options={ this.state.options }
                      bordered={ false }
                      condensed
                      pagination
                      cellEdit={ this.state.cellEdit }
                      tableStyle= { this.state.tableStyle }
                      headerStyle={ this.state.headerStyle }>
        <TableHeaderColumn hiddenOnInsert dataField='id' isKey={true}></TableHeaderColumn>
        <TableHeaderColumn dataField='description'></TableHeaderColumn>
        <TableHeaderColumn hiddenOnInsert dataField='status'></TableHeaderColumn>
      </BootstrapTable>
    );

  },
})


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
                <FixesList fixes={this.state.fixes}
                           getFixesList={this.getFixesList}
                           addFix={this.addFix}
                           updateFix={this.updateFix}/>
              </div>
            </div>

  },
})



/* Rendering Container Form */
ReactDOM.render(
  <FixesContainer/>,
	document.getElementById('container-request-fix')
)
