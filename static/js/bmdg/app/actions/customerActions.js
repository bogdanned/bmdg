import { fixes } from '../connectors/adminConnector'
import { capsulesStore } from '../stores/capsulesStore.js'


export function getFixes() {
  fixes.fetchAll()
  .then(() => {
    capsulesStore.capsules = fixes.filter()
  });
};
