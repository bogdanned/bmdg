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
  refreshSelectedFix(){
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
  componentDidMount(){
    this.getFixesList();
  },
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
