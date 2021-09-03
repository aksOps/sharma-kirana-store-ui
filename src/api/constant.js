const API_BASE_URL="https://sharma-kirana-store.herokuapp.com"
export const GET_ALL_CUSTOMER=API_BASE_URL.concat("/api/v1/").concat("customer/get")
export const GET_CUSTOMER_BY_ID=(id)=>GET_ALL_CUSTOMER.concat("/").concat(id)