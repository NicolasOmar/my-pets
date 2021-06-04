import validators from './validators'

export const isValidForm = form =>
  Object.keys(form)
    .map(input => form[input].isValid)
    .reduce((formStatus, inputStatus) => formStatus && inputStatus, true)

export const isValidInput = inputs => {
  const validations = [
    {
      prop: 'isRequired',
      fn: 'valueIsEmpty'
    },
    {
      prop: 'noNumbers',
      fn: 'valueHasNumbers'
    }
  ]

  return validations
    .map(({ prop, fn }) => (inputs[prop] === true ? !validators[fn](inputs.value) : true))
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
