import {  autorun, observable } from 'mobx';

class CustomerStore {

  @observable customer = {
    'name': '',
  }

  changeName(name){
    this.customer.name = name
  }
  changeWeb(web){
    this.customer.web = web
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
