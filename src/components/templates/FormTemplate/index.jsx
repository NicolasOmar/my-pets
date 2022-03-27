import React from 'react'
import { array, arrayOf, bool, func, object, shape, string } from 'prop-types'
// COMPONENTS
import BasicFrame from '../../organisms/BasicFrame'
import FormLayout from '../../organisms/FormLayout'
import Divider from '../../atoms/Divider'

const FormTemplate = ({
  header,
  isLoading,
  errors,
  inputs,
  dividers,
  formButtons,
  onFormSubmit,
  onInputBlurChange,
  dataFetched = true
}) => {
  const formConfig = {
    header,
    isLoading,
    errors,
    inputs,
    dividers,
    formButtons,
    onFormSubmit: onFormSubmit ?? undefined,
    onInputBlurChange: onInputBlurChange ?? undefined
  }

  return (
    dataFetched && (
      <BasicFrame
        {...{
          header,
          children: <FormLayout {...formConfig} />,
          centerGrid: true
        }}
      />
    )
  )
}

export default FormTemplate

FormTemplate.propTypes = {
  header: object,
  isLoading: bool,
  errors: object,
  inputs: object,
  dividers: arrayOf(
    shape({
      ...Divider.propTypes,
      after: string.isRequired
    })
  ),
  formButtons: array,
  onFormSubmit: func,
  onInputBlurChange: func,
  dataFetched: bool
}
