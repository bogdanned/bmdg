import {  observable } from 'mobx';

class CustomerStore {

  @observable customer;

  constructor() {
    this.customer = null;
  }

}

const customerStore = new CustomerStore();

export default customerStore;
export { CustomerStore };
