import inputClasses from '../constants/input-classes.json'

export const mergeGraphObj = (graphObj, originalObj) => {
  delete graphObj.__typename
  return {
    ...originalObj,
    ...graphObj
  }
}

const renderIf = {
  isFalse: (value, setClass) => setClassMethod(value === false, setClass),
  isNotNull: (value, setClass) => setClassMethod(value !== null && value !== undefined, setClass),
  default: (value, setClass) => setClassMethod(value === true, setClass)
}

const setClassMethod = (condition, setClass) => (condition ? setClass : null)

export const parseInputClass = (inputConfig, fieldName) => {
  const mappedClasses = inputClasses[fieldName]
    .map(({ prop, condition = 'default', setClass }) =>
      renderIf[condition](inputConfig[prop], setClass)
    )
    .filter(className => className)
    .join(' ')

  return mappedClasses !== '' ? fieldName.concat(' ', mappedClasses) : fieldName
}
