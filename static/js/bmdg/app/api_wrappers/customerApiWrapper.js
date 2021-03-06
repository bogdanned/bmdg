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
  endpoint: '/customer/',
  transformPayload: data => (data),
})
class CustomersCollection extends Collection {

}

const customerApi = new CustomersCollection();

export default customerApi
export { customerApi }
