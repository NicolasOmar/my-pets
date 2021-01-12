import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
// HISTORY
import history from './history'
// CONSTANTS
import ROUTES from '../../consts/app-routes'
// COMPONENTS
import MainInfo from '../main-info/main-info'
import NewUserForm from '../new-user-form/new-user-form'
import Login from '../login/login'
import Home from '../home/home'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Redirect exact from="/" to={ROUTES.LOGIN} />
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.PET_INFO} component={MainInfo} />
          <Route exact path={ROUTES.NEW_USER} component={NewUserForm} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
