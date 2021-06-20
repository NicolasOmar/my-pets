import React from 'react'
import { useMutation } from '@apollo/client'
// GRAPHQL CLIENT
import { UPDATE_PASS } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// FORM CONFIG
import { header, inputs, updateButton, cancelButton } from './update-password-form.config.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'

const UpdatePasswordForm = () => {
  const [updatePass, { error }] = useMutation(UPDATE_PASS)

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
    <GridLayout header={header}>
      <Form
        isLoading={false}
        errors={error}
        inputs={inputs}
        formButtons={[updateButton, cancelButton]}
        buttonsGrouped={true}
        onFormSubmit={formData => onSubmitUpdate(formData)}
        onInputBlurChange={onInputBlurChange}
      />
    </GridLayout>
  )
}

export default UpdatePasswordForm
