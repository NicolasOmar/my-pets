import React from 'react'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_PASS } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, updateButton, cancelButton } from './config.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'

const UpdatePassPage = () => {
  const [updatePass, { loading, error }] = useMutation(UPDATE_PASS)

  const onSubmitUpdate = async formData => {
    const variables = {
      oldPass: encryptPass(formData.oldPass),
      newPass: encryptPass(formData.newPass)
    }

    updatePass({ variables })
      .then(response => console.warn(response))
      .catch(error => console.error(error))
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
      formButtons={[updateButton, cancelButton]}
      onFormSubmit={formData => onSubmitUpdate(formData)}
      onInputBlurChange={onInputBlurChange}
    />
  )
}

export default UpdatePassPage
