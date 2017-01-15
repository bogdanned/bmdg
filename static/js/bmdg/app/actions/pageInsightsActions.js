import { pageInsightsApi } from '../api_wrappers/pageInsightsApi'
import { customerStore } from '../stores/customerStore'


export function getPageInsightsLatest() {
  pageInsightsApi.fetchAll()
  .then(() => {
    var insights =  pageInsightsApi.filter({'active':true})
    customerStore.pageInsights = insights[0]
  });
};
