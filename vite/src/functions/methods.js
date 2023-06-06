import validators from './validators'
import VALIDATIONS from '../constants/input-validations.json'

export const checkIsValidForm = form =>
  Object.keys(form)
    .map(input => form[input].isValid ?? true)
    .every(validationState => validationState)

/*
  validateInput:
  First, the method will map all the validations loaded on the "validations"
  For every validation, it will check if yout input has one prop like "isRequired",
    In case it exists it will run the validator related to that prop (in this case, will be "valueIsEmpty") and will return the reverse value (if it is true, then the value will not be valid)
    In case it does not exists, it will return true
  After run all the validation cases, you will get a Boolean array, which will be reduced to one Boolean value by asking if ALL the cases are true
    If it is like that, will return that your input is valid
    In other case (only one of those values is false), will return that your value is invalid
*/
export const validateInput = input => {
  return VALIDATIONS.map(({ prop, fn }) =>
    input[prop] !== undefined ? !validators[fn](input.value, input[prop]) : true
  ).every(validationState => validationState)
}

export const sendObjValues = form =>
  Object.keys(form)
    .map(input => form[input] && { [input]: form[input].value })
    .reduce((parsedForm, inputWithValue) => {
      return {
        ...parsedForm,
        ...inputWithValue
      }
    }, {})
