import { autorun, whyRun, observable } from 'mobx'


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
    limit_reached(){
      var fixes = this.filterByStatus("REQUESTED")
      if (fixes){
        if (fixes.length > 9){
          return true
        }
      }
      return false
      }
}

const fixesStore = new FixesStore

export default fixesStore
export { fixesStore }
