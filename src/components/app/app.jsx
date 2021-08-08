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
import { ROUTES } from '../../constants/routes.json'

const renderHeader = userState => userState && <Header name={userState.name} />

const App = () => {
  const userData = useSelector(({ userState }) => userState)

  return (
    <>
      <Router history={history}>
        {renderHeader(userData)}
        <Redirect exact from={ROUTES.BASE} to={ROUTES.LOGIN} />
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          <Route exact path={ROUTES.NEW_USER} component={NewUserPage} />
          <Route exact path={ROUTES.UPDATE_USER} component={UpdateUserPage} />
          <Route exact path={ROUTES.UPDATE_PASS} component={UpdatePasswordPage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
