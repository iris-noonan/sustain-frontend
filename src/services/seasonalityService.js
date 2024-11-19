//!--- Imports

import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/seasonality`

//!--- Seasonality
//*--- Index ( '/' )
export const getSeasonality = () => {
  return axios.get(BASE_URL)
}