import { combineReducers } from 'redux'
import { getLoggedUser } from '../../functions/local-storage'

const userState = (userData = null, action) => {
  switch (action.type) {
    case 'LOGOUT':
    case 'UPDATE':
    case 'LOGIN':
      return action.payload
    default:
      return getLoggedUser() || userData
  }
}

export default combineReducers({
  userState
})
