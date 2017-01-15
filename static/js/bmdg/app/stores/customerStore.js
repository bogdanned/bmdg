import {  autorun, whyRun, observable, action } from 'mobx';
import pageInsightsApi from '../api_wrappers/pageInsightsApi'


class CustomerStore {

  @observable customer = {
    'name': '',
  }

  @observable pageInsights = {
    'score': 0
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
