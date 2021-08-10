import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
// HISTORY
import history from './history'
// COMPONENTS
import Header from '../templates/header'
import HomePage from '../pages/home-page'
import LoginPage from '../pages/login-page'
import NewUserPage from '../pages/new-user-page'
import UpdateUserPage from '../pages/update-user-page'
import UpdatePasswordPage from '../pages/update-pass-page'
// CONSTANTS
import { APP_ROUTES } from '../../constants/routes.json'

const renderHeader = userState => userState && <Header name={userState.name} />

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
        </Switch>
      </Router>
    </>
  )
}

export default App
