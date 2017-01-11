import { customerStore } from '../stores/customerStore'
import { customerApi } from '../api_wrappers/customerApiWrapper'


export function getCustomer() {
  console.log(customerApi)
  customerApi.fetchAll()
  .then(() => {
    customerStore.customer = customerApi.filter()
  });
};
