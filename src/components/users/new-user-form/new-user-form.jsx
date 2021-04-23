import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// API
import USERSAPI from '../../../api/users.api'
// MODELS
import {
  newUserFormBase,
  newUserFormHeader,
  signUpButton,
  goToLoginButton
} from '../../../configs/new-user.configs.json'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../../helpers/encrypt'
import { setLoggedUser } from '../../../helpers/local-storage'
import { checkEmptyValues, checkFormValidation } from '../../../helpers/methods'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../../graphql/mutations'

const NewUserForm = () => {
  let history = useHistory()
  const [createUser, result] = useMutation(CREATE_USER)

  // useEffect(() => {
  //   const hasEmptyValues = checkEmptyValues(formObject)
  //   const isValidForm = checkFormValidation(formObject)

  //   setHasErrors(!isValidForm || !hasEmptyValues)
  //   !isValidForm && setErrorMsg('The form needs to fill required fields')
  // }, [formObject])

  // const onFormChange = (evt, prop) => {
  //   const { value } = evt.target
  //   const isValidValue = value && value !== ''

  //   setFormObject({
  //     ...formObject,
  //     [prop]: {
  //       ...formObject[prop],
  //       value: isValidValue ? value : null
  //     }
  //   })
  // }

  // const checkValidation = prop => {
  //   const { value, isRequired } = formObject[prop]

  //   setFormObject({
  //     ...formObject,
  //     [prop]: {
  //       ...formObject[prop],
  //       valid: isRequired ? value && value !== '' : true
  //     }
  //   })
  // }

  const onSubmitCreation = async formData => {
    const payload = {
      ...formData,
      password: encryptPass(formData.password)
    }
    console.warn(payload)

    createUser({
      variables: {
        ...payload
      }
    })
      .then(data => console.warn(data))
      .catch(error => console.error(error))
    // const { data, message } = await USERSAPI.CREATE(payload)

    // setIsLoading(false)

    // if (data) {
    //   setLoggedUser({
    //     token: data.token,
    //     ...data.newUser
    //   })

    //   history.push(ROUTES.HOME)
    // } else {
    //   setHasErrors(true)
    //   setErrorMsg(message)
    // }
  }

  // const renderErrorMsg = () => {
  //   return hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null
  // }

  return (
    <GridLayout header={newUserFormHeader}>
      <Form
        isLoading={false}
        formObject={newUserFormBase}
        formButtons={[
          signUpButton,
          {
            ...goToLoginButton,
            onClick: () => history.push(ROUTES.LOGIN)
          }
        ]}
        onFormSubmit={data => onSubmitCreation(data)}
      />
    </GridLayout>
  )
}

export default NewUserForm
