import React, { useState } from 'react'
// SEMANTIC IMPORTS
import { Form, Grid, Header, Segment } from 'semantic-ui-react'

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

  const onformChange = (evt, prop) => {
    const { value } = evt.target
    setFormObject({
      ...formObject,
      [prop]: value !== '' ? value : null,
    })
    console.warn(formObject)
  }

  return (
    <Grid centered>
      <Grid.Column width={8} className="form-column">
        <Segment>
          <Form>
            <Form.Input
              label={'Name'}
              type={'text'}
              onChange={(evt) => onformChange(evt, 'name')}
            />

            <Form.Input
              label={'Last Name'}
              type={'text'}
              onChange={(evt) => onformChange(evt, 'lastName')}
            />

            <Form.Input
              label={'Username'}
              type={'text'}
              onChange={(evt) => onformChange(evt, 'userName')}
            />

            <Form.Input
              label={'Email'}
              type={'mail'}
              onChange={(evt) => onformChange(evt, 'email')}
            />

            <Form.Input
              label={'Password'}
              type={'password'}
              onChange={(evt) => onformChange(evt, 'password')}
            />

            <Form.Input
              label={'Repeat Password'}
              type={'password'}
              onChange={(evt) => onformChange(evt, 'repeatPass')}
            />

            <Form.Button type={'submit'}>Create</Form.Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default NewUserForm
