var React = require('react');
var request = require('superagent');
var cookie = require('react-cookie');

//FixEditAttachments

module.exports =  React.createClass({
  deleteAttachment: function(file, e){
    csrftoken = cookie.load('csrftoken');
    self = this;
    request
      .del("/api/smallfixes/attachments/" + file.id + "/")
      .set("X-CSRFToken", csrftoken)
      .set('Accept', 'application/json')
      .end(function(err, res){
          self.props.getFixesList();
          self.props.refreshSelectedFix();
      });
  },
  render: function(){
    self = this;
    var attachmentsList = this.props.selectedFix.files.map(function(file, index){
      return <p key={file.id} class="attachment-tag">{file.filename}
                <i class='ti-close icon-close pull-right' onClick={self.deleteAttachment.bind(self, file)}/>
              </p>
    })
    return <div>
              <span class="attachment-title">Adjuntos</span>
             {attachmentsList}
           </div>
  }
})
