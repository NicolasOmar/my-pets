import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// GRAPHQL CLIENT
import { CREATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../form/form'
// FORM CONFIG
import { inputs, header, signUpButton, goToLoginButton } from './new-user.config.json'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

const NewUserForm = () => {
  let history = useHistory()
  const [createUser, { loading, error }] = useMutation(CREATE_USER)

  const onSubmitCreation = async formData => {
    const newUser = {
      ...formData,
      repeatPass: undefined,
      password: encryptPass(formData.password)
    }

    createUser({
      variables: { newUser }
    })
      .then(({ data }) => {
        setLoggedUser(data.newUser)

        history.push(ROUTES.HOME)
      })
      .catch(error => console.error(error))
  }

  const onInputBlurChange = formData => {
    const isValid = formData.password.value === formData.repeatPass.value

    return {
      ...formData,
      password: {
        ...formData.password,
        hasCustomValidation: true,
        isValid
      },
      repeatPass: {
        ...formData.repeatPass,
        hasCustomValidation: true,
        isValid
      }
    }
  }

  return (
    <GridLayout header={header}>
      <Form
        isLoading={loading}
        errors={error}
        inputs={inputs}
        formButtons={[
          signUpButton,
          {
            ...goToLoginButton,
            onClick: () => history.push(ROUTES.LOGIN)
          }
        ]}
        buttonsGrouped={true}
        onFormSubmit={data => onSubmitCreation(data)}
        onInputBlurChange={onInputBlurChange}
      />
    </GridLayout>
  )
}

export default NewUserForm
