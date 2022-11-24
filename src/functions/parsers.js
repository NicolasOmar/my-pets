import validator from 'validator'
import { DateTime } from 'luxon'
import inputClasses from '../constants/input-classes.json'

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

export const parseGraphToObj = (graphObj, originalObj) => {
  delete graphObj.__typename
  return {
    ...originalObj,
    ...graphObj
  }
}

/*
  parseConfigToClassName:
  First, you will recive the input configuration with a field value, which is needed to get its corresponding configuration from the JSON file
  After having finded the configuration values, it will map and run "renderIf" method, using the condition (can be specified in the JSON file or will run as a default case), the value of the mapped prop in the input configuration (for example, "isLoading"), which could not exists and the configuration's related css class
  On the "renderIf" method, it will check the input's value condition (explained as the first argument in the "setInputClass" method) and will return:
    The assigned class if the condition is true
    Or a null value in a false case
  At last, after all the cases have been mapped, the main method will filter the null cases and concat them in a string, which will be concated in the final class string return (in case that the "mappedClasses" const gets at least one class)
*/
export const parseConfigToClassName = (inputConfig = {}, fieldName, otherClasses = []) => {
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
}) =>
  Array.isArray(selection)
    ? selection.map(option => ({
        [idAlias]: option[idOriginal],
        [labelAlias]: option[labelOriginal]
      }))
    : []

export const parseNumber = number =>
  !!number && validator.isNumeric(String(number)) ? +number : null

export const parseBooleanToString = (boolean, trueString, falseString) =>
  boolean ? trueString : falseString

export const parseDate = date =>
  !!date && validator.isDate(date) ? new Date(!!+date || date) : null

export const parseDateString = (date, nullValue = null, format = 'dd/LL/yyyy') =>
  date
    ? DateTime.fromMillis(+date)
        .toUTC()
        .toFormat(format)
    : nullValue

export const parseArrayToString = (rawList, prop, separator = ', ') =>
  rawList.map(item => item[prop]).join(separator)

export const parseFormDataToObj = (formData = null) =>
  formData
    ? Object.keys(formData)
        .map(key => ({ [key]: formData[key] ?? null }))
        .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    : {}

export const searchIdsFromNames = (ids = [], stringList = null) =>
  Array.isArray(ids)
    ? ids.map(({ id }) => (stringList ? stringList.find(_string => _string.id === id).name : id))
    : stringList
    ? stringList.find(_string => _string.id === ids.id).name
    : ids.id

export const searchNamesFromIds = (ids = null, list = [], searchMultiple = false) => {
  return searchMultiple
    ? ids
      ? (Array.isArray(ids) ? ids : [ids])
          ?.map(propName => list?.find(({ name }) => propName === name)?.id)
          .filter(_item => _item)
      : null
    : list?.find(({ name }) => ids === name)?.id ?? null
}

export const capitalizeWord = word =>
  word ? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}` : ''
