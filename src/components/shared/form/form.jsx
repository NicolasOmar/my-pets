import React, { useState } from 'react'
import { bool, func, object } from 'prop-types'
import './form.scss'
// COMPONENTS
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../form-button/form-button'
// HELPERS FUNCTIONS
import { isValidInput, sendObjValues } from '../../../functions/methods'
import validators from '../../../functions/validators'

const Form = ({ isLoading, errors, formObject, formButtons, onFormSubmit, onInputBlurChange }) => {
  const [formControls, setFormControls] = useState(formObject)
  const formClass = `ui form ${isLoading ? 'loading' : ''} ${errors ? 'error' : ''}`

  const onInputChange = (evt, prop) => {
    const { value } = evt.target

    setFormControls({
      ...formControls,
      [prop]: {
        ...formControls[prop],
        value: validators.valueIsEmpty(value) ? null : value
      }
    })
  }

  const checkInputIsValid = prop => {
    if (onInputBlurChange) {
      const customValidatedForm = onInputBlurChange(formControls)
      const isValid = customValidatedForm[prop].isValid ? isValidInput(formControls[prop]) : false

      setFormControls({
        ...customValidatedForm,
        [prop]: {
          ...formControls[prop],
          isValid
        }
      })
    } else {
      setFormControls({
        ...formControls,
        [prop]: {
          ...formControls[prop],
          isValid: isValidInput(formControls[prop])
        }
      })
    }
  }

  const onSubmit = evt => {
    evt.preventDefault()

    onFormSubmit(
      sendObjValues({
        ...formControls,
        repeatPassword: undefined
      })
    )
  }

  const renderInputs = () =>
    Object.keys(formControls).map((prop, i) => {
      return (
        <FormInput
          key={`${prop}-${i}`}
          config={{
            ...formControls[prop],
            onInputChange,
            onBlurChange: checkInputIsValid
          }}
        />
      )
    })

  const renderButtons = () =>
    formButtons &&
    Object.keys(formButtons).map((prop, i) => {
      return (
        <FormButton
          key={`${prop}-${i}`}
          config={{
            ...formButtons[prop]
          }}
        />
      )
    })

  const renderErrors = () =>
    errors && (
      <div className="ui error message">
        <div className="header">New Errors</div>
        <ul className="list">
          {errors.graphQLErrors[0].message.split(',').map((error, i) => {
            return <li key={`error-${i}`}>{error}</li>
          })}
        </ul>
      </div>
    )

  return (
    <div className="ui segment">
      <form className={formClass} onSubmit={onSubmit}>
        {renderInputs()}
        {renderButtons()}
        {renderErrors()}
      </form>
    </div>
  )
}

export default Form

Form.propTypes = {
  isLoading: bool,
  errors: object,
  formObject: object.isRequired,
  formButtons: object.isRequired,
  onFormSubmit: func.isRequired,
  onInputBlurChange: func
}
