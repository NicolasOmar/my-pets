import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// SEMANTIC REACT
import { Dropdown, Header, Menu } from 'semantic-ui-react'
// CONSTANTS
import API from '../../consts/api-routes'
import ROUTES from '../../consts/app-routes'
// HELPERS
import { getLoggedUser, logoutUser } from '../../helpers/local-storage'
// STYLES
import './home.scss'

const Home = () => {
  let history = useHistory()
  const [user] = useState(getLoggedUser())
  const homeText = {
    header: `HELLO ${user.name.toUpperCase()}`,
    subHeader: 'Welcome to our beautiful place',
  }

  const onLogout = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

    try {
      await axios.post(API.LOGOUT, {})

      logoutUser()
      history.push(ROUTES.LOGIN)
    } catch (e) {
      console.warn('e', e)
    }
  }

  return (
    <div>
      <Menu>
        <Menu.Item name="Test One" />
        <Menu.Item name="Test Two" />
        <Menu.Item name="Test Three" />
        <Menu.Item name="Test Four" />

        <Menu.Menu position="right">
          <Dropdown item text={user.name.toUpperCase()}>
            <Dropdown.Menu>
              <Dropdown.Item text="Logout" onClick={onLogout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>

      <Header as="h1" textAlign="center">
        {homeText.header}
        <Header.Subheader>{homeText.subHeader}</Header.Subheader>
      </Header>
    </div>
  )
}

export default Home
