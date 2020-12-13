import React from 'react'
// ASSETS
import OurCatPhoto from '../../assets/OurCat.jpeg'
// SEMANTIC IMPORTS
import { Card, Image } from 'semantic-ui-react'

function PetInfo() {
  return (
    <Card centered>
      <Image src={OurCatPhoto}></Image>
      <Card.Content>
        <Card.Header>Flora</Card.Header>
        <Card.Description>Is our first pet</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default PetInfo
