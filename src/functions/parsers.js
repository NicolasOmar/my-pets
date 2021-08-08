import inputClasses from '../constants/input-classes.json'

export const mergeGraphObj = (graphObj, originalObj) => {
  delete graphObj.__typename
  return {
    ...originalObj,
    ...graphObj
  }
}

export const parseInputClass = (inputConfig, fieldName) => {
  // console.warn(inputConfig)
  const mappedClasses = inputClasses[fieldName]
    .map(({ prop, isFalse, setClass }) =>
      isFalse
        ? inputConfig[prop] === false
          ? setClass
          : null
        : inputConfig[prop]
        ? setClass
        : null
    )
    .filter(className => className)
    .join(' ')

  return fieldName.concat(' ', mappedClasses)
}
