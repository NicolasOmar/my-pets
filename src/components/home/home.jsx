import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import * as CryptoJS from 'crypto-js'
// SEMANTIC COMPONENTS
import { Form, Grid, Header, Segment } from 'semantic-ui-react'
// STYLES
import './home.scss'

const baseForm = {
  email: null,
  password: null,
}

const Home = () => {
  let history = useHistory()
  const homeText = {
    header: 'Welcome to My Pets',
    subHeader: 'What whould you like to do?',
  }
  const sendTo = (route) => history.push(route)
  const [formObject, setFormObject] = useState({ ...baseForm })
  const [loading, setLoading] = useState(false)

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    setFormObject({
      ...formObject,
      [prop]: value !== '' ? value : null,
    })
  }

  const onSubmitForm = async () => {
    if (formObject.email === '' || formObject.password === '') {
      return
    }
    console.warn(formObject)
    setLoading(true)
    const { REACT_APP_CRYPT_METH, REACT_APP_CRYPT_SECRET, REACT_APP_API_URL } = process.env
    const payload = {
      email: formObject.email,
      password: CryptoJS[REACT_APP_CRYPT_METH].encrypt(
        formObject.password,
        REACT_APP_CRYPT_SECRET
      ).toString(),
    }
    const call = await axios.post(`${REACT_APP_API_URL}/users/login`, payload)
    console.warn(call)
    setLoading(false)
  }

  return (
    <div>
      <Header as="h1" textAlign="center">
        {homeText.header}
        <Header.Subheader>{homeText.subHeader}</Header.Subheader>
      </Header>

      <Grid centered>
        <Grid.Column width={8}>
          <Segment>
            <Form onSubmit={() => onSubmitForm()} loading={loading}>
              <Form.Input
                label={'Email'}
                type={'email'}
                onChange={(evt) => onFormChange(evt, 'email')}
              />

              <Form.Input
                label={'Password'}
                type={'password'}
                onChange={(evt) => onFormChange(evt, 'password')}
              />

              <Form.Button type={'submit'}>Log in</Form.Button>
              <Form.Button type={'button'} basic color={'red'} onClick={() => sendTo('/new-user')}>
                Or you can sign in
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Home
