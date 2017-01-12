import { autorun, observable } from 'mobx'


class FixesStore{
    @observable fixes = []
    @observable selected_fix = null
    @observable files = []

    filterByStatus(status) {
      return this.fixes.filter(
        fix => (
          fix.status == status
        )
      )
    }
}

const fixesStore = window.store = new FixesStore

export default fixesStore
export { fixesStore }


autorun(()=>{
  console.log( fixesStore.fixes )
})
