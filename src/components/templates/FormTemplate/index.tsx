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
  /** `Attribute` Header configuration object to show a `TitleHeader` above the rest of the components that will compose the frame */
  header: PropTypes.object,
  /** `Styling` Adds a spinner on the form and disable the screen (to avoid additional user behavior with the inputs) */
  isLoading: PropTypes.bool,
  /** `Styling` Similar usage to isLoading, but implemented for data loading from API calls */
  isFetching: PropTypes.bool,
  /** `Attribute` Display an array of error objects that will be displayed in a `Message` component */
  errors: PropTypes.object,
  /** `Attribute` Set of inputs (in a configuration object) that will be parsed and displayed in the form according its provided configuration as `FormInput` */
  inputs: PropTypes.object,
  /** `Attribute` List of splitters that will separate form section */
  dividers: PropTypes.arrayOf(
    PropTypes.shape({
      ...Divider.propTypes,
      after: PropTypes.string.isRequired
    })
  ),
  /** `Attribute` Array of `BasicButtons` objects that will be displayed in a `ButtonGroup` component below the parsed `inputs` */
  formButtons: PropTypes.array,
  /** `Function` Will execute custom code once the form is submited (by pressing enter in any input or clicking on the designated submit button) */
  onFormSubmit: PropTypes.func,
  /** `Function` Will execute custom code on each time the user changes focus from any input, returning input's data */
  onInputBlurChange: PropTypes.func
}
