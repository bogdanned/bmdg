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
  endpoint: '/capsules/',
  transformPayload: data => ({foo: data}),
})
class CapsulesCollection extends Collection {

}

const capsulesApi = new CapsulesCollection();

export default capsulesApi

export { capsulesApi }
