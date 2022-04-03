import React from 'react'
import { useHistory } from 'react-router'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_PASS } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, dividers, updateButton, cancelButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'

const UpdatePassPage = () => {
  let history = useHistory()
  const [updatePass, { loading, error }] = useMutation(UPDATE_PASS)

  const onSubmitUpdate = async formData => {
    const variables = {
      oldPass: encryptPass(formData.oldPass),
      newPass: encryptPass(formData.newPass)
    }

    try {
      await updatePass({ variables })
      history.push(APP_ROUTES.HOME)
    } catch (e) {
      console.error(e)
    }
  }

  const onInputBlurChange = formData => {
    const isValid =
      formData.oldPass.value !== formData.newPass.value &&
      formData.newPass.value === formData.repeatPass.value

    return {
      ...formData,
      oldPass: {
        ...formData.oldPass,
        hasCustomValidation: true,
        isValid
      },
      newPass: {
        ...formData.newPass,
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
      dividers={dividers}
      formButtons={[updateButton, cancelButton]}
      onFormSubmit={formData => onSubmitUpdate(formData)}
      onInputBlurChange={onInputBlurChange}
    />
  )
}

export default UpdatePassPage
