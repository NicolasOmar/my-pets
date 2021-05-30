import React from 'react'
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
  const [createUser, { loading, error }] = useMutation(CREATE_USER)

  const onSubmitCreation = async formData => {
    const newUser = {
      ...formData,
      password: encryptPass(formData.password)
    }

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
        isLoading={loading}
        formObject={newUserFormBase}
        formButtons={{
          signUpButton,
          goToLoginButton: {
            ...goToLoginButton,
            onClick: () => history.push(ROUTES.LOGIN)
          }
        }}
        onFormSubmit={data => onSubmitCreation(data)}
        errors={error}
      />
    </GridLayout>
  )
}

export default NewUserForm
