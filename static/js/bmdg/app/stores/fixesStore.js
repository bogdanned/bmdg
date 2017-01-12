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
    limit_reached(){
      if (this.fixes.length > 5){
        console.log(this.fixes.length)
        return true
      }
      return false
    }
}

const fixesStore = window.store = new FixesStore

export default fixesStore
export { fixesStore }


autorun(()=>{
  console.log( fixesStore.fixes )
})
