import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
// HISTORY
import history from './history'
// COMPONENTS
import Header from '../header/header'
import Home from '../home/home'
import LoginForm from '../../core/login-form/login-form'
import NewUserForm from '../../users/new-user-form/new-user-form'
import UpdateUserForm from '../../users/update-user-form/update-user-form'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const renderHeader = () => getLoggedUser() && <Header name={getLoggedUser().name} />

const App = () => {
  return (
    <div>
      <Router history={history}>
        {renderHeader()}
        <Redirect exact from={ROUTES.BASE} to={ROUTES.LOGIN} />
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.LOGIN} component={LoginForm} />
          <Route exact path={ROUTES.NEW_USER} component={NewUserForm} />
          <Route exact path={ROUTES.UPDATE_USER} component={UpdateUserForm} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
