import inputClasses from '../constants/input-classes.json'

export const mergeGraphObj = (graphObj, originalObj) => {
  delete graphObj.__typename
  return {
    ...originalObj,
    ...graphObj
  }
}

export const parseInputClass = (inputConfig, fieldName) => {
  const mappedClasses = inputClasses[fieldName]
    .map(({ prop, renderIfIsFalse, setClass }) =>
      renderIfIsFalse
        ? inputConfig[prop] === false
          ? setClass
          : null
        : inputConfig[prop] === true
        ? setClass
        : null
    )
    .filter(className => className)
    .join(' ')

  return mappedClasses !== '' ? fieldName.concat(' ', mappedClasses) : fieldName
}
