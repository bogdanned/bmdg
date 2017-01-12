import axios from 'axios'
import Collection from 'mobx-collection'
import restApi from './mobxRestApi'
import cookie from 'react-cookie'

@restApi({
  axios: axios.create({
    baseURL: '/api',
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': cookie.load('csrftoken'),
    }
  }),
  endpoint: '/smallfixes/',
  transformPayload: data => (data),
})
class FixesCollection extends Collection {

}

const fixesApi = new FixesCollection();

export default fixesApi

export { fixesApi }
