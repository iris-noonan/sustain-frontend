//!--- Imports

import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/badges`

//!--- Badges
//*--- Index ( '/' )
export const getBadges= () => {
  return axios.get(BASE_URL)
}