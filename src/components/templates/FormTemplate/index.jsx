import React from 'react'
import { array, bool, func, object } from 'prop-types'
// COMPONENTS
import BasicFrame from '../../organisms/BasicFrame'
import FormLayout from '../../organisms/FormLayout'

const FormTemplate = ({
  header,
  isLoading,
  errors,
  inputs,
  formButtons,
  buttonsGrouped,
  onFormSubmit,
  onInputBlurChange
}) => {
  const formConfig = {
    header,
    isLoading,
    errors,
    inputs,
    formButtons,
    buttonsGrouped,
    onFormSubmit: onFormSubmit ?? undefined,
    onInputBlurChange: onInputBlurChange ?? undefined
  }

  return (
    <BasicFrame
      {...{
        header,
        children: <FormLayout {...formConfig} />,
        centerGrid: true
      }}
    />
  )
}

export default FormTemplate

FormTemplate.propTypes = {
  header: object,
  isLoading: bool,
  errors: object,
  inputs: object,
  formButtons: array,
  buttonsGrouped: bool,
  onFormSubmit: func,
  onInputBlurChange: func
}
