import { element, object } from 'prop-types'
import React from 'react'
import './form.scss'
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../form-button/form-button'

const Form = ({ formObject, formButtons }) => {
  return (
    <div className="ui segment">
      <form className="ui form">
        {Object.keys(formObject).map((prop, i) => {
          return (
            <FormInput
              key={`${prop}-${i}`}
              config={{
                ...formObject[prop]
                // onInputChange,
                // onBlurChange: checkValidation
              }}
            />
          )
        })}
        {formButtons &&
          Object.keys(formButtons).map((prop, i) => {
            return (
              <FormButton
                key={`${prop}-${i}`}
                config={{
                  ...formButtons[prop]
                  // onInputChange,
                  // onBlurChange: checkValidation
                }}
              />
            )
          })}
      </form>
    </div>
  )
}

export default Form

Form.propTypes = {
  formObject: object,
  formButtons: object,
  children: element
}
