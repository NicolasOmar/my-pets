import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import BasicFrame from '../../organisms/BasicFrame'
import FormLayout from '../../organisms/FormLayout'
import Divider from '../../atoms/Divider'
import ProgressBar from '../../atoms/ProgressBar'

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
          <ProgressBar key="form-progressBar" />
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
  header: PropTypes.object,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  errors: PropTypes.object,
  inputs: PropTypes.object,
  dividers: PropTypes.arrayOf(
    PropTypes.shape({
      ...Divider.propTypes,
      after: PropTypes.string.isRequired
    })
  ),
  formButtons: PropTypes.array,
  onFormSubmit: PropTypes.func,
  onInputBlurChange: PropTypes.func
}
