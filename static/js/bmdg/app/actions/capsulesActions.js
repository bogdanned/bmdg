import { capsulesApi } from '../api_wrappers/capsulesApiWrapper'
import { capsulesStore } from '../stores/capsulesStore'


export function getCapsules() {
  capsulesApi.fetchAll()
  .then(() => {
    capsulesStore.capsules = capsulesApi.filter()
  });
};
