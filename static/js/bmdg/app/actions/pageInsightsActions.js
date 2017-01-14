import { pageInsightsApi } from '../api_wrappers/pageInsightsApi'
import { customerStore } from '../stores/customerStore'


export function getPageInsightsLatest() {
  pageInsightsApi.fetchAll()
  .then(() => {
    customerStore.pageInsights = pageInsightsApi.filter({'active':true});
  });
};
