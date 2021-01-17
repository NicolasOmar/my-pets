import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
// HISTORY
import history from './history'
// CONSTANTS
import ROUTES from '../../constants/app-routes'
// COMPONENTS
import Home from '../home/home'
import LoginForm from '../login-form/login-form'
import NewUserForm from '../new-user-form/new-user-form'
import UpdateUserForm from '../update-user-form/update-user-form'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Redirect exact from="/" to={ROUTES.LOGIN} />
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
