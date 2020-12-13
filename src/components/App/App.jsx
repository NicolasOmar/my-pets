import React from 'react'
// IMPORT REACT DOM UTILITIES
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
// IMPORT COMPONENTS
import Home from '../home/home'
import MainInfo from '../main-info/main-info'
import NewUserForm from '../new-user-form/new-user-form'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Home />

        <Switch>
          <Route exact path="/pet-info" component={MainInfo} />
          <Route exact path="/new-user" component={NewUserForm} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
