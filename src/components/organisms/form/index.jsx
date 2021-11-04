import React, { useEffect, useRef, useState } from 'react'
import { arrayOf, bool, func, object, shape, string, oneOf } from 'prop-types'
// COMPONENTS
import FormInput from '../../molecules/form-input'
import ButtonGroup from '../../molecules/button-group'
import MessageBlock from '../../atoms/message-block'
// HELPER FUNCTIONS
import { checkIsValidForm, checkIsValidInput, sendObjValues } from '../../../functions/methods'
import validators from '../../../functions/validators'
import { parseCssClasses } from '../../../functions/parsers'
// ENUMS
import { buttonTypeEnums } from '../../../enums/type.enums.json'
import { colorEnums } from '../../../enums/styles.enums.json'

const Form = ({ isLoading, errors, inputs, formButtons, onFormSubmit, onInputBlurChange }) => {
  const [formControls, setFormControls] = useState(inputs)
  const [disableSignUpButton, setDisableSignUpButton] = useState(true)
  const firstUpdate = useRef(true)
  const formClass = parseCssClasses({ isLoading, errors }, 'ui form')

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
    if (onFormSubmit) {
      evt.preventDefault()
      !disableSignUpButton && onFormSubmit(sendObjValues({ ...formControls }))
    }
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
    formButtons && <ButtonGroup buttons={formButtons.map(btn => ({ ...btn }))} />

  const renderErrors = () =>
    errors && (
      <MessageBlock
        msgType={'error'}
        header={'New Errors'}
        errors={errors.graphQLErrors[0].message.split(',')}
      />
    )

  return (
    <div className="ui segment">
      <form data-testid="form" className={formClass} onSubmit={onSubmit}>
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
  formButtons: arrayOf(
    shape({
      type: oneOf(buttonTypeEnums).isRequired,
      color: oneOf(colorEnums),
      isDisabled: bool,
      onClick: func,
      label: string.isRequired
    })
  ),
  onFormSubmit: func,
  onInputBlurChange: func
}
