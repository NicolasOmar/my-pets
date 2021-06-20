import React, { useEffect, useRef, useState } from 'react'
import { bool, func, object } from 'prop-types'
import './form.scss'
// COMPONENTS
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../form-button/form-button'
// HELPERS FUNCTIONS
import { isValidForm, isValidInput, sendObjValues } from '../../../functions/methods'
import validators from '../../../functions/validators'
// ENUMS
import { buttonTypeEnums } from '../../../enums/buttons.enum.json'

const Form = ({ isLoading, errors, formObject, formButtons, onFormSubmit, onInputBlurChange }) => {
  const [formControls, setFormControls] = useState(formObject)
  const [disableSignUpButton, setDisableSignUpButton] = useState(true)
  const firstUpdate = useRef(true)
  const formClass = `ui form ${isLoading ? 'loading' : ''} ${errors ? 'error' : ''}`

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    setDisableSignUpButton(!isValidForm(formControls))
  }, [formControls])

  const onInputChange = (evt, prop) => {
    const { value } = evt.target

    checkInputIsValid(prop, {
      ...formControls,
      [prop]: {
        ...formControls[prop],
        value: validators.valueIsEmpty(value) ? '' : value
      }
    })
  }

  const checkInputIsValid = (prop, _formControls) => {
    !_formControls && (_formControls = formControls)

    if (onInputBlurChange) {
      const validatedForm = onInputBlurChange(_formControls)

      setFormControls({
        ...validatedForm,
        [prop]: {
          ...validatedForm[prop],
          isValid: validatedForm[prop].hasCustomValidation
            ? isValidInput(_formControls[prop]) && validatedForm[prop].isValid
            : isValidInput(_formControls[prop])
        }
      })
    } else {
      setFormControls({
        ..._formControls,
        [prop]: {
          ..._formControls[prop],
          isValid: isValidInput(_formControls[prop])
        }
      })
    }
  }

  const onBlurChange = input => checkInputIsValid(input)

  const onSubmit = evt => {
    evt.preventDefault()

    !disableSignUpButton && onFormSubmit(sendObjValues({ ...formControls }))
  }

  const renderInputs = () =>
    Object.keys(formControls).map((prop, i) => {
      return (
        <FormInput
          key={`${prop}-${i}`}
          config={{
            ...formControls[prop],
            onInputChange,
            onBlurChange
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
          config={
            formButtons[prop].type === buttonTypeEnums[0]
              ? { ...formButtons[prop] }
              : { ...formButtons[prop], isDisabled: disableSignUpButton }
          }
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
