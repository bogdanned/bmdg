import { fixes } from '../api_wrappers/capsulesApiWrapper'
import { capsulesStore } from '../stores/capsulesStore'


export function getCapsules() {
  fixes.fetchAll()
  .then(() => {
    capsulesStore.capsules = fixes.filter()
  });
};
