const { default: axios } = require("axios");
const { getLoggedUser } = require("../helpers/local-storage");

axios.interceptors.request.use(
  request => {
    const userData = getLoggedUser()

    userData && (request.headers['Authorization'] = `Bearer ${userData.token}`)
    return request
  }
)

axios.interceptors.response.use(
  response => response,
  error => {
    console.warn(error)
    return error
  }
)

export default axios