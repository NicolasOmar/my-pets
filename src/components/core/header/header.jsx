import React from 'react'
import { useHistory } from 'react-router-dom'
import { string } from 'prop-types'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../../graphql/mutations'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'
// HELPER FUNCTIONS
import { clearAllStorage } from '../../../functions/local-storage'
// STYLES
import './header.scss'

const Header = ({ name }) => {
  let history = useHistory()
  const [logout] = useMutation(LOGOUT)
  const dispatch = useDispatch()

  const onUpdateUser = () => history.push(ROUTES.UPDATE_USER)

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
      history.push(ROUTES.LOGIN)
    } catch (e) {
      console.warn('e', e)
    }
  }

  return (
    <>
      <div className="ui secondary pointing menu">
        {/* <a className="active item">Test One</a>
        <a className="item">Test Two</a>
        <a className="item">Test Three</a> */}

        <div className="right menu">
          <div className="ui simple dropdown item">
            {name.toUpperCase()}
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
    </>
  )
}

export default Header

Header.propTypes = {
  name: string
}
