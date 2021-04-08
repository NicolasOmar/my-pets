import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../../shared/form-button/form-button'
// API
import USERSAPI from '../../../api/users.api'
// MODELS
import {
  newUserFormBase,
  newUserFormHeader,
  signUpButton,
  goToLoginButton
} from '../../../configs/new-user.configs'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../../helpers/encrypt'
import { setLoggedUser } from '../../../helpers/local-storage'
import { checkEmptyValues, checkFormValidation } from '../../../helpers/methods'

const NewUserForm = () => {
  let history = useHistory()
  const [formObject, setFormObject] = useState({ ...newUserFormBase })
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const hasEmptyValues = checkEmptyValues(formObject)
    const isValidForm = checkFormValidation(formObject)

    setHasErrors(!isValidForm || !hasEmptyValues)
    !isValidForm && setErrorMsg('The form needs to fill required fields')
  }, [formObject])

  const onFormChange = (evt, prop) => {
    const { value } = evt.target
    const isValidValue = value && value !== ''

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

  const onSubmitCreation = async () => {
    if (hasErrors) {
      return
    }

    setIsLoading(true)

    const payload = {
      name: formObject.name.value,
      lastName: formObject.lastName.value,
      email: formObject.email.value,
      password: encryptPass(formObject.password.value)
    }
    const { data, message } = await USERSAPI.CREATE(payload)

    setIsLoading(false)

    if (data) {
      setLoggedUser({
        token: data.token,
        ...data.newUser
      })

      history.push(ROUTES.HOME)
    } else {
      setHasErrors(true)
      setErrorMsg(message)
    }
  }

  // const renderErrorMsg = () => {
  //   return hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null
  // }

  return (
    // <GridLayout header={newUserFormHeader}>
    //   <Segment>
    //     <Form error={hasErrors} loading={isLoading} onSubmit={onSubmitCreation}>
    //       {Object.keys(formObject).map((prop, i) => {
    //         return (
    //           <FormInput
    //             key={`${prop}-${i}`}
    //             config={{
    //               ...formObject[prop],
    //               onInputChange: onFormChange,
    //               onBlurChange: checkValidation
    //             }}
    //           />
    //         )
    //       })}

    //       <FormButton config={signUpButton} />
    //       <FormButton
    //         config={{
    //           ...goToLoginButton,
    //           onClick: () => history.push(ROUTES.LOGIN)
    //         }}
    //       />

    //       {renderErrorMsg()}
    //     </Form>
    //   </Segment>
    // </GridLayout>
    <div></div>
  )
}

export default NewUserForm
