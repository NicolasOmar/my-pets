import React from 'react'
// SEMANTIC IMPORTS
import { Grid, Header } from 'semantic-ui-react'
// COMPONENTS
import LogList from '../log-list/log-list'
import PetInfo from '../pet-info/pet-info'
// SCSS
import './app.scss'

function App() {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Header as={'h1'} textAlign={'center'} className="main-header">
          Welcome to My Pets
        </Header>
      </Grid.Column>

      <Grid.Column width={6} textAlign="center">
        <PetInfo />
      </Grid.Column>

      <Grid.Column width={10} textAlign="center">
        <LogList />
      </Grid.Column>
    </Grid>
  )
}

export default App
