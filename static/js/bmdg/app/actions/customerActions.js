import { customerStore } from '../stores/customerStore'
import { customerApi } from '../api_wrappers/customerApiWrapper'


export function getCustomer() {
  customerApi.fetchAll()
  .then(() => {
    customerStore.customer = customerApi.get(1)
  });
};


export function saveCustomer(customer) {
  customerApi.update(customer.id, customer)
  .then(() => {
  });
};
