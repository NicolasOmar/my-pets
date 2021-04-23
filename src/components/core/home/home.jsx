import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'
import Header from '../../shared/header/header'
// STYLES
import './home.scss'

const Home = () => {
  let history = useHistory()
  const [user] = useState(getLoggedUser())
  const homeText = {
    header: `HELLO ${user.name.toUpperCase()}`,
    subHeader: 'Welcome to our beautiful place'
  }

  const onUpdateUser = () => history.push(ROUTES.UPDATE_USER)

  const onLogout = async () => {
    try {
      // TODO: INTEGRATE GRAPH MUTATION FOR LOGOUT USER
      history.push(ROUTES.LOGIN)
    } catch (e) {
      console.warn('e', e)
    }
  }

  return (
    <>
      <div className="ui secondary pointing menu">
        <a className="active item">Test One</a>
        <a className="item">Test Two</a>
        <a className="item">Test Three</a>
        <div className="right menu">
          <div className="ui simple dropdown item">
            {user.name.toUpperCase()}
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item" onClick={onUpdateUser}>
                Update User
              </div>
              <div className="item" onClick={onLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header {...homeText} />
    </>
  )
}

export default Home
