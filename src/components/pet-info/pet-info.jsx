import React from 'react'
// SEMANTIC IMPORTS
import { Card } from 'semantic-ui-react'

function PetInfo() {
  return (
    <Card centered>
      <Card.Content>
        <Card.Header>Flora</Card.Header>
        <Card.Description>Is our first pet</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default PetInfo
