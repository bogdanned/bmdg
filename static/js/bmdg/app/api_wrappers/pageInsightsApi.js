import axios from 'axios'
import Collection from 'mobx-collection'
import restApi from './mobxRestApi'
import cookie from 'react-cookie'

@restApi({
  axios: axios.create({
    baseURL: '/analysis/api',
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': cookie.load('csrftoken'),
    }
  }),
  endpoint: '/page-insights/',
  transformPayload: data => (data),
})
class PageInsightsCollection extends Collection {

}

const pageInsightsApi = new PageInsightsCollection();

export default pageInsightsApi

export { pageInsightsApi }
