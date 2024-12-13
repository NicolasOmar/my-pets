import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS
import { clearAllStorage } from '../../../functions/local-storage'
// MOCKS
import config from './config.json'
import { NavBar } from 'reactive-bulma'
import { NavBarProps } from 'reactive-bulma/dist/interfaces/organismProps'

const { brandIcon } = config

interface HeaderUserProps {
  name: string
}

const UserHeader: React.FC<HeaderUserProps> = ({ name }) => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [logout] = useMutation(LOGOUT)

  const onLogout = async () => {
    try {
      await logout()
      clearAllStorage()
      userContext?.setUserData(null)
      navigate(APP_ROUTES.LOGIN)
    } catch (e) {
      console.warn('e', e)
    }
  }

  const dropdownConfig: NavBarProps = {
    // icon: {
    //   ...brandIcon,
    //   onClick: () => navigate(APP_ROUTES.HOME)
    // },
    itemsAtEnd: {
      itemList: [
        {
          text: name.toUpperCase(),
          items: [
            { children: <p onClick={() => navigate(APP_ROUTES.ADD_PET)}>{'Add Pet'}</p> },
            { children: <p onClick={() => navigate(APP_ROUTES.LIST_MY_PETS)}>{'See My Pets'}</p> },
            { children: <p onClick={() => navigate(APP_ROUTES.SETTINGS)}>{'Settings'}</p> },
            { children: <p onClick={onLogout}>{'Logout'}</p> }
          ],
          isHoverable: true
        }
      ]
    }
  }

  return <NavBar {...dropdownConfig}/>
}

export default UserHeader