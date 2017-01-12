import { customerStore } from '../stores/customerStore'
import { customerApi } from '../api_wrappers/customerApiWrapper'


export function getCustomer() {
  customerApi.fetchAll()
  .then(() => {
    customerStore.customer = customerApi.filter()
  });
};
