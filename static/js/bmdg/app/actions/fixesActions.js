import { fixesApi } from '../api_wrappers/fixesApiWrapper'
import { fixesStore } from '../stores/fixesStore'


export function getFixes() {
  fixesApi.fetchAll()
  .then(() => {
    fixesStore.fixes = fixesApi.filter()
  });
};
