import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import FormInput from '../../molecules/FormInput'
import ButtonGroup from '../../molecules/ButtonGroup'
import Message from '../../atoms/Message'
import Divider from '../../atoms/Divider'
import BasicButton from '../../atoms/BasicButton'
// FUNCTIONS
import { checkIsValidForm, validateInput, sendObjValues } from '../../../functions/methods'
import { parseFieldConfigToClasses } from '../../../functions/parsers'
import validators from '../../../functions/validators'

const FormLayout = ({
  inputs,
  dividers = [],
  formButtons = [],
  errors = null,
  isLoading = false,
  isBoxed = true,
  onFormSubmit,
  onInputBlurChange
}) => {
  const formClasses = parseFieldConfigToClasses({
    fieldConfig: { isBoxed, errors },
    fieldName: 'form'
  })
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
    <form key="form-base" data-testid="test-form-base" className={formClasses} onSubmit={onSubmit}>
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
  /** `Required` `Attribute` Set of inputs (in a configuration object) that will be parsed and displayed in the form according its provided configuration as `FormInput` */
  inputs: PropTypes.object.isRequired,
  /** `Attribute` List of splitters that will separate form section */
  dividers: PropTypes.arrayOf(
    PropTypes.shape({
      ...Divider.propTypes,
      after: PropTypes.string.isRequired
    })
  ),
  /** `Attribute` Array of `BasicButtons` objects that will be displayed in a `ButtonGroup` component below the parsed `inputs` */
  formButtons: PropTypes.arrayOf(
    PropTypes.shape(BasicButton.propTypes)
  ),
  /** `Attribute` Display an array of error objects that will be displayed in a `Message` component */
  errors: PropTypes.object,
  /** `Styling` Adds a spinner on the form and disable the screen (to avoid additional user behavior with the inputs) */
  isLoading: PropTypes.bool,
  /** `Styling` Sets the form container as a box (differentiating it from the screen) */
  isBoxed: PropTypes.bool,
  /** `Function` Will execute custom code once the form is submited (by pressing enter in any input or clicking on the designated submit button) */
  onFormSubmit: PropTypes.func,
  /** `Function` Will execute custom code on each time the user changes focus from any input, returning input's data */
  onInputBlurChange: PropTypes.func
}
