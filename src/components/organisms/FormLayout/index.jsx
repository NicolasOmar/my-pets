import React, { useEffect, useRef, useState } from 'react'
import { arrayOf, bool, func, object, shape, string } from 'prop-types'
// COMPONENTS
import FormInput from '../../molecules/FormInput'
import ButtonGroup from '../../molecules/ButtonGroup'
import Message from '../../atoms/Message'
import Divider from '../../atoms/Divider'
import BasicButton from '../../atoms/BasicButton'
// FUNCTIONS
import { checkIsValidForm, validateInput, sendObjValues } from '../../../functions/methods'
import { parseConfigToClassName } from '../../../functions/parsers'
import validators from '../../../functions/validators'

const FormLayout = ({
  isLoading = false,
  isBoxed = true,
  errors = null,
  inputs,
  dividers = [],
  formButtons = [],
  onFormSubmit,
  onInputBlurChange
}) => {
  const formClass = parseConfigToClassName({ isBoxed, errors }, 'form')
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
            ? validateInput(_formControls[prop]) && validatedForm[prop].isValid
            : validateInput(_formControls[prop])
        }
      })
    } else {
      setFormControls({
        ..._formControls,
        [prop]: {
          ..._formControls[prop],
          isValid: validateInput(_formControls[prop])
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

  return (
    <form key="form-base" data-testid="test-form-base" className={formClass} onSubmit={onSubmit}>
      {Object.keys(formControls).map((prop, i) => {
        const { isVisible, isDisabled, label, control } = formControls[prop]
        const divider = Array.isArray(dividers) && dividers.find(({ after }) => after === control)

        return (
          <>
            {isVisible && (
              <FormInput
                key={`input-${prop}-${i}`}
                inputLabel={label}
                isLoading={isLoading}
                inputConfig={{
                  ...formControls[prop],
                  isDisabled: isDisabled || isLoading,
                  onInputChange,
                  onBlurChange
                }}
              />
            )}
            {divider && <Divider key={`divider-after-${control}`} {...divider} />}
          </>
        )
      })}
      {formButtons && (
        <>
          <Divider
            key="form-button-group-divider"
            color={'grey-light'}
            style={{ margin: '25px 0 20px 0' }}
          />
          <ButtonGroup key="form-button-group" buttons={formButtons.map(btn => ({ ...btn }))} />
        </>
      )}
      {errors && (
        <Message
          key="form-error-message"
          msgType={'error'}
          headerText={'New Errors'}
          messages={errors.graphQLErrors[0].message.split(',')}
        />
      )}
    </form>
  )
}

export default FormLayout

FormLayout.propTypes = {
  isLoading: bool,
  isBoxed: bool,
  errors: object,
  inputs: object.isRequired,
  dividers: arrayOf(
    shape({
      ...Divider.propTypes,
      after: string.isRequired
    })
  ),
  formButtons: arrayOf(shape(BasicButton.propTypes)),
  onFormSubmit: func,
  onInputBlurChange: func
}
