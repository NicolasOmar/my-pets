import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// GRAPHQL CLIENT
import { CREATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// MODELS
import {
  newUserFormBase,
  newUserFormHeader,
  signUpButton,
  goToLoginButton
} from '../../../configs/new-user.configs.json'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

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

  // const renderErrorMsg = () => {
  //   return hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null
  // }

  const onSubmitCreation = async formData => {
    const newUser = {
      ...formData,
      password: encryptPass(formData.password)
    }
    delete newUser.userName

    createUser({
      variables: {
        newUser
      }
    })
      .then(({ data }) => {
        setLoggedUser(data.newUser)

        history.push(ROUTES.HOME)
      })
      .catch(error => console.error(error))
  }

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
