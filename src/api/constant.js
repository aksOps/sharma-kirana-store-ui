import {message} from "antd";

/*const LOCALHOST="http://localhost:8080"*/
const PROD_API_URL = "https://sharma-kirana-store.herokuapp.com"

const API_BASE_URL = PROD_API_URL
export const GET_ALL_CUSTOMER = API_BASE_URL.concat("/api/v1/").concat("customer/get")
export const ADD_CUSTOMER = API_BASE_URL.concat("/api/v1/").concat("customer/add")
export const GET_CUSTOMER_BY_ID = (id) => GET_ALL_CUSTOMER.concat("/").concat(id)
export const DELETE_CUSTOMER_BY_ID = (id) => API_BASE_URL.concat("/api/v1/").concat("customer/delete/").concat(id)

export const needToImplementWarning = () => {
    message.destroy()
    message.warn("This is not implemented")
}