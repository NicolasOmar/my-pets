import React from 'react'
// IMPORT REACT DOM UTILITIES
import { Router, Route, Switch } from 'react-router-dom'
import history from '../../history'
// IMPORT COMPONENTS
import MainInfo from '../main-info/main-info'
import NewUserForm from '../new-user-form/new-user-form'
// IMPORT STYLES
import './app.scss'

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainInfo} />
        <Route path="/new-user" component={NewUserForm} />
      </Switch>
    </Router>
  )
}

export default App
