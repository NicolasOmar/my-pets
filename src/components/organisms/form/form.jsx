import React, { useEffect, useRef, useState } from 'react'
import { array, bool, func, object } from 'prop-types'
import './form.scss'
// COMPONENTS
import FormInput from '../../molecules/form-input/form-input'
import BasicButton from '../../elements/basic-button/basic-button'
import ButtonGroup from '../../molecules/button-group/button-group'
// HELPERS FUNCTIONS
import { checkIsValidForm, checkIsValidInput, sendObjValues } from '../../../functions/methods'
import validators from '../../../functions/validators'
// ENUMS
import { buttonTypeEnums } from '../../../enums/buttons.enum.json'

const Form = ({
  isLoading,
  errors,
  inputs,
  formButtons,
  buttonsGrouped,
  onFormSubmit,
  onInputBlurChange
}) => {
  const [formControls, setFormControls] = useState(inputs)
  const [disableSignUpButton, setDisableSignUpButton] = useState(true)
  const firstUpdate = useRef(true)
  const formClass = `ui form ${isLoading ? 'loading' : ''} ${errors ? 'error' : ''}`

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    setDisableSignUpButton(!checkIsValidForm(formControls))
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
            ? checkIsValidInput(_formControls[prop]) && validatedForm[prop].isValid
            : checkIsValidInput(_formControls[prop])
        }
      })
    } else {
      setFormControls({
        ..._formControls,
        [prop]: {
          ..._formControls[prop],
          isValid: checkIsValidInput(_formControls[prop])
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
          inputLabel={formControls[prop].label}
          inputConfig={{
            ...formControls[prop],
            onInputChange,
            onBlurChange
          }}
        />
      )
    })

  const renderButtons = () =>
    buttonsGrouped ? (
      <ButtonGroup buttons={formButtons.map(btn => ({ ...btn }))} />
    ) : (
      formButtons.map((btn, i) => {
        return (
          <BasicButton
            key={`btn-${i}`}
            config={{
              ...btn,
              isDisabled: btn.type === buttonTypeEnums[0] ? disableSignUpButton : false
            }}
          />
        )
      })
    )

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
  inputs: object.isRequired,
  formButtons: array.isRequired,
  buttonsGrouped: bool,
  onFormSubmit: func.isRequired,
  onInputBlurChange: func
}
