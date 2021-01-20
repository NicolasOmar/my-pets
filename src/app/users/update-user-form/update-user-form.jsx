import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// SEMANTIC REACT
import { Form, Segment, Message, Button } from 'semantic-ui-react'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import FormInput from '../../shared/form-input/form-input'
// API
import USERSAPI from '../../../api/users.api'
// MODELS
import { updateUserFormBase, updateUserFormHeader } from '../../../configs/update-user.configs'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { getLoggedUser, setLoggedUser } from '../../../helpers/local-storage'
import { checkEmptyValues, checkFormValidation } from '../../../helpers/methods'

const UpdateUserForm = () => {
  let history = useHistory()
  const [formObject, setFormObject] = useState(updateUserFormBase)
  const [hasData, setHasData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!hasData) {
      const user = getLoggedUser()

      Object.keys(user).forEach(key => formObject[key] && (formObject[key].value = user[key]))
      setFormObject({ ...formObject })
      setHasData(true)
    }
  }, [hasData, formObject])

  useEffect(() => {
    const hasEmptyValues = checkEmptyValues(formObject)
    const isValidForm = checkFormValidation(formObject)

    setHasErrors(!isValidForm || !hasEmptyValues)
    !isValidForm && setErrorMsg('The form needs to fill required fields')
  }, [formObject])

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    const isValidValue = value !== ''

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        value: isValidValue ? value : null
      }
    })
  }

  const checkValidation = prop => {
    const { value, isRequired } = formObject[prop]

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        valid: isRequired ? value && value !== '' : true
      }
    })
  }

  const onSubmitUpdate = async () => {
    if (hasErrors) {
      return
    }

    setIsLoading(true)

    const { name, lastName } = formObject
    const payload = {
      name: name.value,
      lastName: lastName.value
    }
    const { data, message } = await USERSAPI.UPDATE(payload)

    setIsLoading(false)

    if (data) {
      setLoggedUser({
        ...getLoggedUser(),
        ...payload
      })
      onCancel()
    } else {
      setHasErrors(true)
      setErrorMsg(message)
    }
  }

  const onCancel = () => history.push(ROUTES.HOME)

  const renderErrorMsg = () =>
    hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null

  return (
    <GridLayout header={updateUserFormHeader}>
      <Segment>
        <Form error={hasErrors} loading={isLoading} onSubmit={onSubmitUpdate}>
          {Object.keys(formObject).map((prop, i) => {
            return (
              <FormInput
                key={`${prop}-${i}`}
                config={{
                  ...formObject[prop],
                  onInputChange: onFormChange,
                  onBlurChange: checkValidation
                }}
              />
            )
          })}

          <Button.Group>
            <Button positive type={'submit'}>
              Save
            </Button>
            <Button.Or />
            <Button onClick={onCancel}>Cancel</Button>
          </Button.Group>

          {renderErrorMsg()}
        </Form>
      </Segment>
    </GridLayout>
  )
}

export default UpdateUserForm
