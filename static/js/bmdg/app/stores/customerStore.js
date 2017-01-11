import {  autorun, observable } from 'mobx';

class CustomerStore {

  @observable customer = null

}

const customerStore = new CustomerStore()

export default customerStore
export { customerStore }


autorun(() => {
    console.log(customerStore.customer)
})
