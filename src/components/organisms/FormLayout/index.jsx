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

const FormLayout = ({
  isLoading = false,
  isBoxed = true,
  errors = null,
  inputs,
  formButtons = [],
  onFormSubmit,
  onInputBlurChange
}) => {
  const formClass = parseCssClasses({ isBoxed, errors }, 'form')
  const firstUpdate = useRef(true)
  const [formControls, setFormControls] = useState(inputs)
  const [disableConfirmButton, setDisableConfirmButton] = useState(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setDisableConfirmButton(!checkIsValidForm(formControls))
  }, [formControls])

  const onInputChange = (evt, prop) => {
    const { value } = evt.target || evt

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
      !disableConfirmButton && onFormSubmit(sendObjValues({ ...formControls }))
    }
  }

  const renderInputs = () =>
    Object.keys(formControls).map((prop, i) => (
      <FormInput
        key={`${prop}-${i}`}
        inputLabel={formControls[prop].label}
        isLoading={isLoading}
        inputConfig={{
          ...formControls[prop],
          onInputChange,
          onBlurChange
        }}
      />
    ))

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

export default FormLayout

FormLayout.propTypes = {
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