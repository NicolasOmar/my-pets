import React from 'react'
import { useHistory } from 'react-router-dom'
import { string } from 'prop-types'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../../graphql/mutations'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { clearAllStorage } from '../../../functions/local-storage'
import Header from '../../organisms/header'

const UserHeader = ({ name }) => {
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
        history.push(APP_ROUTES.LOGIN)
      })
    } catch (e) {
      console.warn('e', e)
    }
  }

  const dropdownConfig = {
    menuLabel: name.toUpperCase(),
    options: [
      {
        label: 'Update User',
        onClick: () => history.push(APP_ROUTES.UPDATE_USER)
      },
      {
        label: 'Update Pass',
        onClick: () => history.push(APP_ROUTES.UPDATE_PASS)
      },
      {
        label: 'Logout',
        onClick: onLogout
      }
    ]
  }

  return <Header {...{ dropdownConfig }} />
}

export default UserHeader

UserHeader.propTypes = {
  name: string.isRequired
}
