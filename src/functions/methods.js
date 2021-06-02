import validators from './validators'

export const checkFormValidation = formObj =>
  Object.keys(formObj)
    .map(prop => formObj[prop].isValid)
    .reduce((accumulator, current) => accumulator && current, true)

export const isValidInput = inputObj => {
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

  return !validations
    .map(({ prop, fn }) => (inputObj[prop] === true ? validators[fn](inputObj.value) : false))
    .reduce((previous, current) => previous || current, false)
}

export const checkEmptyValues = formObj =>
  Object.keys(formObj)
    .map(prop => formObj[prop].value)
    .reduce((accumulator, current) => accumulator && !!current && current !== '', true)

export const sendObjValues = formControls =>
  Object.keys(formControls)
    .map(prop => {
      return (
        formControls[prop] && {
          [prop]: formControls[prop].value
        }
      )
    })
    .reduce((accumulator, current) => {
      return {
        ...accumulator,
        ...current
      }
    }, {})
