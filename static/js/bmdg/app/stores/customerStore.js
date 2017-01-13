import {  autorun, observable } from 'mobx';

class CustomerStore {

  @observable customer = {
    'name': '',
  }

  changeName(name){
    this.customer.name = name
  }

}

const customerStore = window.store = new CustomerStore()

export default customerStore
export { customerStore }


autorun(() => {
    console.log(customerStore.customer.name)
})
