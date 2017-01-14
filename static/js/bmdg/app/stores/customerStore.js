import {  autorun, observable } from 'mobx';

class CustomerStore {

  @observable customer = {
    'name': '',
  }

  @observable pageInsights = {
    'score': '',
  }

  changeName(name){
    this.customer.name = name
  }
  changeEmail(email){
    this.customer.email = email
  }
  changeNif(nif){
    this.customer.nif = nif
  }
  changeAddress(address){
    this.customer.adress = address
  }
}

const customerStore = window.store = new CustomerStore()

export default customerStore
export { customerStore }


autorun(() => {
  console.log(customerStore.pageInsights)
})
