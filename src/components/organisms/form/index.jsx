import React, { useEffect, useRef, useState } from 'react'
import { arrayOf, bool, func, object, shape, string, oneOf } from 'prop-types'
// COMPONENTS
import FormInput from '../../molecules/FormInput'
import ButtonGroup from '../../molecules/ButtonGroup'
import Message from '../../atoms/Message'
// FUNCTIONS
import { checkIsValidForm, checkIsValidInput, sendObjValues } from '../../../functions/methods'
import validators from '../../../functions/validators'
import { parseCssClasses, parseObjKeys } from '../../../functions/parsers'
// ENUMS
import { buttonTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'

const Form = ({
  isLoading = false,
  isBoxed = true,
  errors = null,
  inputs,
  formButtons = [],
  onFormSubmit,
  onInputBlurChange
}) => {
  const [formControls, setFormControls] = useState(inputs)
  const [disableSignUpButton, setDisableSignUpButton] = useState(true)
  const firstUpdate = useRef(true)
  const formClass = parseCssClasses({ isLoading, isBoxed, errors }, 'form')

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
      <Message
        msgType={'error'}
        headerText={'New Errors'}
        messages={errors.graphQLErrors[0].message.split(',')}
      />
    )

  return (
    <form data-testid="form" className={formClass} onSubmit={onSubmit}>
      {renderInputs()}
      {renderButtons()}
      {renderErrors()}
    </form>
  )
}

export default Form

Form.propTypes = {
  isLoading: bool,
  isBoxed: bool,
  errors: object,
  inputs: object.isRequired,
  formButtons: arrayOf(
    shape({
      type: oneOf(buttonTypes).isRequired,
      color: oneOf(parseObjKeys(colors)),
      size: oneOf(parseObjKeys(sizes)),
      isOutlined: bool,
      isInverted: bool,
      isLoading: bool,
      isDisabled: bool,
      onClick: func,
      label: string.isRequired
    })
  ),
  onFormSubmit: func,
  onInputBlurChange: func
}
