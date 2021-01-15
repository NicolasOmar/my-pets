// INTERCEPTOR
import axios from './interceptors'
// CONSTANTS
import API from "../constants/api-routes";

const USERSAPI = {
  LOGIN: async loginPayload => await axios.post(API.LOGIN, loginPayload),
  CREATE: async payload => await axios.post(API.NEW_USER, payload),
  LOGOUT: async () => await axios.post(API.LOGOUT, {})
}

export default USERSAPI