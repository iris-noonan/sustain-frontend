//!--- Imports

import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/categories`

//!--- Categories
//*--- Index ( '/' )
export const getCategories = () => {
  return axios.get(BASE_URL)
}