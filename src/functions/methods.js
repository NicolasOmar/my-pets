import validators from './validators'
import { validations } from '../constants/input-validations.json'

export const checkIsValidForm = form =>
  Object.keys(form)
    .map(input => form[input].isValid || false)
    .reduce((formStatus, inputStatus) => formStatus && inputStatus, true)

export const checkIsValidInput = input => {
  return validations
    .map(({ prop, fn }) =>
      input[prop] !== undefined ? !validators[fn](input.value, input[prop]) : true
    )
    .reduce((finalValidValue, nextValidValue) => finalValidValue && nextValidValue, true)
}

export const sendObjValues = form =>
  Object.keys(form)
    .map(input => {
      return (
        form[input] && {
          [input]: form[input].value
        }
      )
    })
    .reduce((parsedForm, inputWithValue) => {
      return {
        ...parsedForm,
        ...inputWithValue
      }
    }, {})
