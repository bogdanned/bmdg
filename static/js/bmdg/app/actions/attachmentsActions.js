import request from 'superagent'
import cookie from 'react-cookie'
import { fixesStore } from '../stores/fixesStore'
import * as fixesActions from '../actions/fixesActions'


export function addAttachment(fix, files) {
  console.log(fix)
  console.log(files)
  const csrftoken = cookie.load('csrftoken');
  var req = request.post("/attachments/add")
  for (var i = 0; i < files.length; i++){
    var file = files[i]
    req.attach(file.name, file)
  }
  req.field('fix_id', fix.id)
  req.set("X-CSRFToken", csrftoken)
  req.end(function(err, res){
    console.log('add attachments')
    console.log(fix)
    fixesActions.refreshFix(fix)
  })
};


export function deleteAttachment(fix, file){
  const csrftoken = cookie.load('csrftoken');
  self = this;
  request
    .del("/api/smallfixes/attachments/" + file.id + "/")
    .set("X-CSRFToken", csrftoken)
    .set('Accept', 'application/json')
    .end(function(err, res){
      fixesActions.refreshFix(fix)
    });
}
