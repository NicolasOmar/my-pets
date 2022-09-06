import validator from 'validator'
import { DateTime } from 'luxon'
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
  selection = null,
  idOriginal = 'id',
  idAlias = 'value',
  labelOriginal = 'name',
  labelAlias = 'label'
}) => {
  return Array.isArray(selection)
    ? selection.map(option => ({
        [idAlias]: option[idOriginal],
        [labelAlias]: option[labelOriginal]
      }))
    : []
}

export const parseNumber = number =>
  !!number && validator.isNumeric(String(number)) ? +number : null

export const parseBooleanStrings = (boolean, trueString, falseString) =>
  boolean ? trueString : falseString

export const parseDate = date =>
  !!date && validator.isDate(date) ? new Date(!!+date || date) : null

export const parseDateString = (date, nullValue = null, format = 'dd/LL/yyyy') =>
  date ? DateTime.fromMillis(+date).toFormat(format) : nullValue

export const parseArrayToString = (rawList, prop) => rawList.map(item => item[prop]).join(', ')

export const parseFormData = (formData = null) =>
  formData
    ? Object.keys(formData)
        .map(key => ({ [key]: formData[key] ?? null }))
        .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    : {}

export const parseIdsToStrings = (ids = [], stringList = null) =>
  Array.isArray(ids)
    ? ids.map(({ id }) => (stringList ? stringList.find(_string => _string.id === id).name : id))
    : stringList
    ? stringList.find(_string => _string.id === ids.id).name
    : ids.id

export const getPropsIds = (prop, list, searchMultiple = false) => {
  return searchMultiple
    ? (Array.isArray(prop) ? prop : [prop])?.map(
        propName => list?.find(({ name }) => propName === name)?.id
      )
    : list?.find(({ name }) => prop === name)?.id
}

export const normalizeCapitalWord = (word = '') =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
