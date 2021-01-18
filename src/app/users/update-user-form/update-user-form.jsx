import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Grid, Segment, Header, Message, Button } from 'semantic-ui-react'
// API
import USERSAPI from '../../../api/users.api'
// MODELS
import { updateUserFormBase, updateUserFormHeader } from '../../../models/update-user-form'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { getLoggedUser, setLoggedUser } from '../../../helpers/local-storage'
import { checkFormValidation } from '../../../helpers/methods'

const UpdateUserForm = () => {
  let history = useHistory()
  const [user] = useState(getLoggedUser())
  const [header] = useState(updateUserFormHeader)
  const [formObject, setFormObject] = useState({ ...updateUserFormBase })
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setHasErrors(!checkFormValidation(formObject))
    return () => {}
  }, [formObject])

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    const isValidValue = value !== ''

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        value: isValidValue ? value : null,
      },
    })
  }

  const checkValidation = (prop) => {
    const valid = formObject[prop].value !== null

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        valid,
      },
    })
  }

  const onSubmitUpdate = async () => {
    if (hasErrors) {
      return
    }

    setLoading(true)

    const { name, lastName } = formObject
    const payload = {
      name: name.value,
      lastName: lastName.value,
    }
    const { data, message } = await USERSAPI.UPDATE(payload)

    if (data) {
      setLoggedUser({
        ...user,
        ...payload,
      })
      onCancel()
    } else {
      setHasErrors(true)
      setErrorMsg(message)
    }

    setLoading(false)
  }

  const onCancel = () => history.push(ROUTES.HOME)

  const renderErrorMsg = () => {
    return <Message error header="Oops" content={errorMsg} />
  }

  return (
    <div>
      <Header as="h1" textAlign={header.align}>
        {header.header}
      </Header>

      <Grid centered>
        <Grid.Column width={8} className="form-column">
          <Segment>
            <Form error={hasErrors} loading={loading} onSubmit={() => onSubmitUpdate()}>
              <Form.Input
                label={formObject.name.label}
                type={formObject.name.type}
                defaultValue={user.name}
                onChange={(evt) => onFormChange(evt, formObject.name.control)}
                onBlur={() => checkValidation(formObject.name.control)}
                error={!formObject.name.valid}
              />

              <Form.Input
                label={formObject.lastName.label}
                type={formObject.lastName.type}
                defaultValue={user.lastName}
                onChange={(evt) => onFormChange(evt, formObject.lastName.control)}
                onBlur={() => checkValidation(formObject.lastName.control)}
                error={!formObject.lastName.valid}
              />

              <Button.Group>
                <Button positive type={'submit'}>
                  Save
                </Button>
                <Button.Or />
                <Button error onClick={onCancel}>
                  Cancel
                </Button>
              </Button.Group>

              {hasErrors && renderErrorMsg()}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default UpdateUserForm
