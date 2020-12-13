import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'
// IMPORT STYLES
import './home.scss'

const Home = () => {
  let history = useHistory()
  const homeText = {
    header: 'Welcome to My Pets',
    subHeader: 'What whould you like to do?',
  }
  const sendTo = (route) => history.push(route)

  return (
    <div>
      <Header as="h1" textAlign="center">
        {homeText.header}
        <Header.Subheader>{homeText.subHeader}</Header.Subheader>
      </Header>

      <Container textAlign="center">
        <Button.Group>
          <Button color="violet" onClick={() => sendTo('/pet-info')}>
            My pet information
          </Button>

          <Button color="purple" onClick={() => sendTo('/new-user')}>
            Create a new user
          </Button>
        </Button.Group>
      </Container>
    </div>
  )
}

export default Home
