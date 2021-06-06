import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
// HISTORY
import history from './history'
// COMPONENTS
import Header from '../header/header'
import Home from '../home/home'
import LoginForm from '../../core/login-form/login-form'
import NewUserForm from '../../users/new-user-form/new-user-form'
import UpdateUserForm from '../../users/update-user-form/update-user-form'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'

const renderHeader = userState => userState && <Header name={userState.name} />

const App = () => {
  const userData = useSelector(({ userState }) => userState)

  return (
    <div>
      <Router history={history}>
        {renderHeader(userData)}
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
