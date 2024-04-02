import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

const { inputs, header, signUpButton, goToLoginButton } = CONFIG
const { APP_ROUTES } = ROUTES

const NewUser = () => {
  let navigate = useNavigate()
  const [createUser, { loading, error }] = useMutation(CREATE_USER)
  const { setUserData } = useContext(UserContext)

  const onSubmitCreation = async formData => {
    const newUser = {
      ...formData,
      repeatPass: undefined,
      password: encryptPass(formData.password)
    }

    try {
      const response = await createUser({ variables: { newUser } })
      setLoggedUser(response.data?.createUser)
      setUserData(response.data?.createUser)
      navigate(APP_ROUTES.HOME)
    } catch (e) {
      console.error(e)
    }
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
          onClick: () => navigate(APP_ROUTES.LOGIN)
        }
      ]}
      onFormSubmit={data => onSubmitCreation(data)}
      onInputBlurChange={onInputBlurChange}
    />
  )
}

export default NewUser
