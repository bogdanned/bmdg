import { fixesApi } from '../api_wrappers/fixesApiWrapper'
import { fixesStore } from '../stores/fixesStore'


export function getFixes() {
  fixesApi.fetchAll()
  .then(() => {
    fixesStore.fixes = fixesApi.filter()
  });
};


export function getFix(fix) {
  fixesApi.fetch(fix.id)
  .then(() => {
    return fixesApi.filter({id: fix.id})
  });
};


export function refreshFix(fix) {
  fixesApi.fetch(fix.id)
  .then(() => {
    console.log("update dfix")
    console.log(fixesApi.filter({id: fix.id}))
    fixesStore.selected_fix = fixesApi.find({id: fix.id})
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


export function selectFix(fix) {
  fixesStore.selected_fix = fix
};
