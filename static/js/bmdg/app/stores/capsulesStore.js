import * as request from "superagent"
import * as cookie from 'react-cookie'
import { autorun, observable } from 'mobx'


class CapsulesStore{
    @observable capsules = []
    @observable capsulesfilter


    filterByStatus(status) {
      console.log(this.capsules)
      return this.capsules.filter(
        capsule => (
          capsule.status == status
        )
      )
    }
}

const capsulesStore = window.store = new CapsulesStore

export default capsulesStore
export { capsulesStore }



autorun(() => {
  console.log(capsulesStore.capsules);
})
