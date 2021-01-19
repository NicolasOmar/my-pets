const apiUrl = process.env.REACT_APP_API_URL;

const API = {
  LOGIN: `${apiUrl}/users/login`,
  ME: `${apiUrl}/users/me`,
  NEW_USER: `${apiUrl}/users`,
  LOGOUT: `${apiUrl}/users/logout`,
}

export default API