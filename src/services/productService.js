//!--- Imports

import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`

//!--- Products
//*--- Index ( '/' )
export const index = () => {
  return axios.get(BASE_URL)
}

//*--- Show ('/products/:productId')
export const show = (productId) => {
  return axios.get(`${BASE_URL}/${productId}/`)
}

//*--- Create ('/')
export const create = (formData) => {
  return axios.post(`${BASE_URL}/`, formData)
}

//*--- Update ('/products/:productId')
export const update = (productId, formData) => {
  return axios.put(`${BASE_URL}/${productId}/`, formData)
}

//*--- Delete ('/products/:productId')
export const deleteProduct = (productId) => {
  return axios.delete(`${BASE_URL}/${productId}/`)
}
