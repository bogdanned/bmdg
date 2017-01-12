import { observable } from 'mobx'


class CapsulesStore{
    @observable capsules = []
    @observable capsulesfilter


    filterByStatus(status) {
      return this.capsules.filter(
        capsule => (
          capsule.status == status
        )
      )
    }
}

const capsulesStore  = new CapsulesStore

export default capsulesStore
export { capsulesStore }
