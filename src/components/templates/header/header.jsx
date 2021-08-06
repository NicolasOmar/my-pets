import React from 'react'
import { useHistory } from 'react-router-dom'
import { string } from 'prop-types'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../../graphql/mutations'
// COMPONENTS
import MenuDropdown from '../../molecules/menu-dropdown/menu-dropdown'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { clearAllStorage } from '../../../functions/local-storage'
// STYLES
import './header.scss'

const Header = ({ name }) => {
  let history = useHistory()
  const [logout] = useMutation(LOGOUT)
  const dispatch = useDispatch()

  const onLogout = async () => {
    try {
      logout().then(() => {
        clearAllStorage()
        dispatch({
          type: 'LOGOUT',
          payload: null
        })
        history.push(ROUTES.LOGIN)
      })
    } catch (e) {
      console.warn('e', e)
    }
  }

  const data = {
    menuLabel: name.toUpperCase(),
    options: [
      {
        label: 'Update User',
        onClick: () => history.push(ROUTES.UPDATE_USER)
      },
      {
        label: 'Update Pass',
        onClick: () => history.push(ROUTES.UPDATE_PASS)
      },
      {
        label: 'Logout',
        onClick: onLogout
      }
    ]
  }

  return (
    <>
      <div className="ui secondary pointing menu">
        {/* <a className="active item">Test One</a>
        <a className="item">Test Two</a>
        <a className="item">Test Three</a> */}

        <div className="right menu">
          <MenuDropdown {...data} />
        </div>
      </div>
    </>
  )
}

export default Header

Header.propTypes = {
  name: string.isRequired
}
