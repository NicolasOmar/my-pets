import React from 'react'
// SEMANTIC IMPORTS
import { Grid } from 'semantic-ui-react'
// COMPONENTS
import LogList from '../log-list/log-list'
import PetInfo from '../pet-info/pet-info'

const MainInfo = () => {
  return (
    <Grid centered>
      <Grid.Column width={6} textAlign="center">
        <PetInfo />
      </Grid.Column>

      <Grid.Column width={10} textAlign="center">
        <LogList />
      </Grid.Column>
    </Grid>
  )
}

export default MainInfo
