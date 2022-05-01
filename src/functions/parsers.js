import validator from 'validator'
import inputClasses from '../constants/input-classes.json'

export const mergeGraphObj = (graphObj, originalObj) => {
  delete graphObj.__typename
  return {
    ...originalObj,
    ...graphObj
  }
}

const setInputClass = (condition, setClass) => (condition ? setClass : null)

const renderIf = {
  isFalse: (value, setClass) => setInputClass(value === false, setClass),
  isNotNull: (value, setClass) => setInputClass(value !== null && value !== undefined, setClass),
  default: (value, setClass) => setInputClass(value === true, setClass)
}

const mergeInputClasses = (commons, input) =>
  [...input, ...commons].filter(({ prop }, _, mergedArray) =>
    mergedArray.find(inputClass => inputClass.prop === prop)
  )

/*
  parseCssClasses:
  First, you will recive the input configuration with a field value, which is needed to get its corresponding configuration from the JSON file
  After having finded the configuration values, it will map and run "renderIf" method, using the condition (can be specified in the JSON file or will run as a default case), the value of the mapped prop in the input configuration (for example, "isLoading"), which could not exists and the configuration's related css class
  On the "renderIf" method, it will check the input's value condition (explained as the first argument in the "setInputClass" method) and will return:
    The assigned class if the condition is true
    Or a null value in a false case
  At last, after all the cases have been mapped, the main method will filter the null cases and concat them in a string, which will be concated in the final class string return (in case that the "mappedClasses" const gets at least one class)
*/
export const parseCssClasses = (inputConfig = {}, fieldName, otherClasses = []) => {
  const classes = mergeInputClasses(inputClasses['common'], inputClasses[fieldName] ?? [])
  const mappedClasses = classes
    .map(({ prop, condition = 'default', setClass }) =>
      renderIf[condition](inputConfig[prop], setClass)
    )
    .filter(className => className)
  const concatedClasses = [...mappedClasses, ...otherClasses]
    .filter(value => value && value !== '')
    .join(' ')

  return fieldName?.concat(' ', concatedClasses)
}

export const parseObjKeys = (_obj, asNumber = false) =>
  Object.keys(_obj).map(_objValue => (asNumber ? +_objValue : _objValue))

export const parseDropdownOptions = ({
  selection,
  idOriginal = 'id',
  idAlias = 'value',
  labelOriginal = 'name',
  labelAlias = 'label',
  withNullValue = true
}) => {
  const arrayWithNull = withNullValue ? [{ value: null, label: null }] : []
  return Array.isArray(selection)
    ? [
        ...arrayWithNull,
        ...selection.map(option => ({
          [idAlias]: option[idOriginal],
          [labelAlias]: option[labelOriginal]
        }))
      ]
    : []
}

export const parseNumber = number => (!!number && validator.isNumeric(number) ? +number : null)

export const parseDate = date => (date ? new Date(date) : null)

export const parseFormData = formData =>
  Object.keys(formData)
    .map(key => ({ [key]: formData[key] ?? null }))
    .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
