import { array, bool, func, object } from 'prop-types'
import React from 'react'
// COMPONENTS
import BasicFrame from '../../organisms/basic-frame'
import Form from '../../organisms/form'

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
        children: <Form {...formConfig} />,
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
