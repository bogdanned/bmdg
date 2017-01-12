import { fixesApi } from '../api_wrappers/fixesApiWrapper'
import { fixesStore } from '../stores/fixesStore'
import { request } from 'superagent'
import { cookie } from 'react-cookie'


export function getFixes() {
  fixesApi.fetchAll()
  .then(() => {
    console.log(fixesApi.filter())
    fixesStore.fixes = fixesApi.filter()
  });
};


export function getFix(fix) {
  fixesApi.fetch(fix.id)
  .then(() => {
    fixesStore.fixes = fixesApi.filter()
  });
};


export function addFix(fix) {
  fixesApi.create(fix)
  .then(() => {
    fixesStore.fixes = fixesApi.filter()
  });
};


export function deleteFix(fix) {
  fixesApi.delete(fix.id)
  .then(() => {
    fixesStore.fixes = fixesApi.filter()
  });
};


export function updateFix(fix) {
  payload = {}
  fixesApi.update(fix.id, payload)
  .then(() => {
    fixesStore.fixes = fixesApi.filter()
  });
};


export function addFiles(fix, files) {
  const csrftoken = cookie.load('csrftoken');
  var req = request.post("/attachments/add")
  for (var i = 0; i < files.length; i++){
    file=files[i]
    req.attach(file.name, file)
  }
  req.field('fix_id', fix.id)
  req.set("X-CSRFToken", csrftoken)
  req.end(function(err, res){
    self.props.refreshSelectedFix();
  })


};
