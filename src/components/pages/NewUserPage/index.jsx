import React from 'react'
import { useHistory } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { inputs, header, signUpButton, goToLoginButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

const NewUserPage = () => {
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

        history.push(APP_ROUTES.HOME)
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
    <FormTemplate
      header={header}
      isLoading={loading}
      errors={error}
      inputs={inputs}
      formButtons={[
        signUpButton,
        {
          ...goToLoginButton,
          onClick: () => history.push(APP_ROUTES.LOGIN)
        }
      ]}
      onFormSubmit={data => onSubmitCreation(data)}
      onInputBlurChange={onInputBlurChange}
    />
  )
}

export default NewUserPage
