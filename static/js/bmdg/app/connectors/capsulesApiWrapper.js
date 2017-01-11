import axios from 'axios'
import Collection from 'mobx-collection'
import restApi from 'mobx-collection-rest-api'
import cookie from 'react-cookie'

@restApi({
  axios: axios.create({
    baseURL: '/api',
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': cookie.load('csrftoken'),
    }
  }),
  endpoint: '/smallfixes',
  transformPayload: data => ({foo: data}),
})
class FixesCollection extends Collection {

}

const fixes = new FixesCollection();

export default fixes
export { fixes }


/*
foos.fetchAll()
.then(() => {
  console.log(this)
});*/