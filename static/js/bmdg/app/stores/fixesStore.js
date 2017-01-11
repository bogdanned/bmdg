import { observable } from 'mobx'


class FixesStore{
    @observable fixes = []
    @observable fixesfilter


    filterByStatus(status) {
      return this.fixes.filter(
        fix => (
          fix.status == status
        )
      )
    }
}

const fixesStore  = new FixesStore

export default fixesStore
export { fixesStore }
