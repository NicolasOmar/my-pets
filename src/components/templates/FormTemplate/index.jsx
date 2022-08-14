import React from 'react'
import { array, arrayOf, bool, func, object, shape, string } from 'prop-types'
// COMPONENTS
import BasicFrame from '../../organisms/BasicFrame'
import FormLayout from '../../organisms/FormLayout'
import Divider from '../../atoms/Divider'
import Spinner from '../../atoms/Spinner'

const FormTemplate = ({
  header,
  isLoading,
  isFetching = false,
  errors,
  inputs,
  dividers,
  formButtons,
  onFormSubmit,
  onInputBlurChange
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
    <BasicFrame
      {...{
        header,
        children: isFetching ? (
          <Spinner key="form-spinner" />
        ) : (
          <FormLayout key="form-layout" {...formConfig} />
        ),
        centerGrid: true
      }}
    />
  )
}

export default FormTemplate

FormTemplate.propTypes = {
  header: object,
  isLoading: bool,
  isFetching: bool,
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
  onInputBlurChange: func
}
