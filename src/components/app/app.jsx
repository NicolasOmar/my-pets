import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
// HISTORY
import history from './history'
// COMPONENTS
import UserHeader from '../templates/UserHeader'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NewUserPage from '../pages/NewUserPage'
import UpdateUserPage from '../pages/UpdateUserPage'
import UpdatePasswordPage from '../pages/UpdatePassPage'
import AddPetPage from '../pages/AddPetPage'
// CONSTANTS
import { APP_ROUTES } from '../../constants/routes.json'

const renderHeader = userState => userState && <UserHeader name={userState.name} />

const App = () => {
  const userData = useSelector(({ userState }) => userState)

  return (
    <>
      <Router history={history}>
        {renderHeader(userData)}
        <Redirect exact from={APP_ROUTES.BASE} to={APP_ROUTES.LOGIN} />
        <Switch>
          <Route exact path={APP_ROUTES.HOME} component={HomePage} />
          <Route exact path={APP_ROUTES.LOGIN} component={LoginPage} />
          <Route exact path={APP_ROUTES.NEW_USER} component={NewUserPage} />
          <Route exact path={APP_ROUTES.UPDATE_USER} component={UpdateUserPage} />
          <Route exact path={APP_ROUTES.UPDATE_PASS} component={UpdatePasswordPage} />
          <Route exact path={APP_ROUTES.ADD_PET} component={AddPetPage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
