import { customerStore } from '../stores/customerStore'
import { customerApi } from '../api_wrappers/customerApiWrapper'


export function getCustomer() {
  customerApi.fetchAll()
  .then(() => {
    console.log(customerApi.get(1))
    customerStore.customer = customerApi.get(1)
  });
};
