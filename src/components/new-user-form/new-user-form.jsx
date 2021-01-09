import React, { useState } from 'react'
import axios from 'axios'
// SEMANTIC COMPONENTS
import { Form, Grid, Segment } from 'semantic-ui-react'
// HELPERS
import { encryptPass } from '../../helpers/encrypt'

const baseForm = {
  name: null,
  lastName: null,
  userName: null,
  email: null,
  password: null,
  repeatPass: null,
}

const NewUserForm = () => {
  const [formObject, setFormObject] = useState({ ...baseForm })
  const [loading, setLoading] = useState(false)

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    setFormObject({
      ...formObject,
      [prop]: value !== '' ? value : null,
    })
    console.warn(formObject)
  }

  const onSubmitCreation = async () => {
    setLoading(true)

    try {
      const { REACT_APP_API_URL } = process.env
      const payload = {
        name: formObject.name,
        lastName: formObject.lastName,
        email: formObject.email,
        password: encryptPass(formObject.password),
      }
      const call = await axios.post(`${REACT_APP_API_URL}/users`, payload)
      console.warn(call)
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <Grid centered>
      <Grid.Column width={8} className="form-column">
        <Segment>
          <Form onSubmit={() => onSubmitCreation()} loading={loading}>
            <Form.Input
              label={'Name'}
              type={'text'}
              onChange={(evt) => onFormChange(evt, 'name')}
            />

            <Form.Input
              label={'Last Name'}
              type={'text'}
              onChange={(evt) => onFormChange(evt, 'lastName')}
            />

            <Form.Input
              label={'Username'}
              type={'text'}
              onChange={(evt) => onFormChange(evt, 'userName')}
            />

            <Form.Input
              label={'Email'}
              type={'mail'}
              onChange={(evt) => onFormChange(evt, 'email')}
            />

            <Form.Input
              label={'Password'}
              type={'password'}
              onChange={(evt) => onFormChange(evt, 'password')}
            />

            {/* <Form.Input
              label={'Repeat Password'}
              type={'password'}
              onChange={(evt) => onFormChange(evt, 'repeatPass')}
            /> */}

            <Form.Button type={'submit'}>Create</Form.Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default NewUserForm
