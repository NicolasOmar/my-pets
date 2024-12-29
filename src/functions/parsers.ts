import validator from 'validator'
import { DateTime } from 'luxon'
import tagClasses from '../constants/tag-classes.json'

const setInputClass = (condition, setClass) => (condition ? setClass : null)

const renderIf = {
  isFalse: (value, setClass) => setInputClass(value === false, setClass),
  isNotNull: (value, setClass) => setInputClass(value !== null && value !== undefined, setClass),
  default: (value, setClass) => setInputClass(value === true, setClass)
}

const mergeFieldClasses = (commons, input) =>
  [...input, ...(commons ?? [])].filter(({ prop }, _, mergedArray) =>
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
  parseFieldConfigToClasses:
    {
      useCommonClasses => will add common bulma classes in case the fieldConfig needs to use it
      fieldName => used to append at the string result start, also to render its custom classes (have to be added in "tag-classes" file)
      fieldConfig => configuration object with properties that will be used to render in css classes
      otherClasses => other raw/string classes that will be appended at the string result end
    }
  First, it will merge the properties from common "tagClasses" (in case you want it) and the props from the input config object (from "tag-classes" file)
  Second, it will map the "classes" and run "renderIf" method, using the condition (can be specified in the JSON file or will run as a default case), the value of the mapped prop in the input configuration (for example, "isLoading"), which could not exists and the configuration's related css class
  On the "renderIf" method, it will check the input's value condition (explained as the first argument in the "setInputClass" method) and will return:
    The assigned class if the condition is true
    Or a null value in a false case
  At last, after all the cases have been mapped, the main method will filter the null cases and concat them in a string, which will be concated in the final class string return (in case that the "mappedClasses" const gets at least one class)
*/
export const parseFieldConfigToClasses = ({
  useCommonClasses = false,
  fieldConfig = {},
  fieldName,
  otherClasses = []
}) => {
  const classes = mergeFieldClasses(
    useCommonClasses ? tagClasses['common'] : null,
    tagClasses[fieldName] ?? []
  )
  const mappedConditionalClasses = classes
    .map(({ prop, condition = 'default', setClass }) =>
      renderIf[condition](fieldConfig[prop], setClass)
    )
    .filter(className => className)
  const concatedClasses = [...mappedConditionalClasses, ...otherClasses]
    .filter(value => Boolean(value && value !== ''))
    .join(' ')

  return fieldName?.concat(' ', concatedClasses).trim()
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

export const parseNumber = (number: number, defaultNullValue: number | null = 0) =>
  !isNaN(number) ? number : defaultNullValue

export const parseDate = date =>
  !!date && validator.isDate(date) ? new Date(!!+date || date) : null

export const parseDateString = (date, nullValue = null, format = 'dd/LL/yyyy') =>
  date ? DateTime.fromMillis(+date).toUTC().toFormat(format) : nullValue

interface ParseArrayToStringProps<T> {
  rawList: T[]
  prop: keyof T
  separator?: string
}

export const parseArrayToString: <T>(props: ParseArrayToStringProps<T>) => string = ({
  rawList,
  prop,
  separator = ', '
}) => rawList.map(item => item[prop]).join(separator)

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
    : (list?.find(({ name }) => ids === name)?.id ?? null)
}

export const capitalizeWord = word =>
  word ? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}` : ''

export const buildArgTypes = (baseObj, extensions = {}) => {
  return Object.keys(baseObj)
    .map(key => ({
      [key]: extensions[key]
        ? {
            ...baseObj[key],
            ...extensions[key]
          }
        : baseObj[key]
    }))
    .reduce((firstObj, objKey) => ({
      ...firstObj,
      ...objKey
    }))
}

export const parseListToStoryOptions = (list, isObject = false, separator = ' | ') =>
  isObject ? Object.keys(list).join(separator) : list.join(separator)

export const parseSingularPluralStrings = ({
  quantity = 0,
  zeroString = 'no data',
  singularString = 'singular',
  pluralString = null,
  pluralAddition = 's',
  startString = '',
  endString = ''
}) => {
  let partialText = ''
  const pluralAlternative = pluralString ?? `${singularString}${pluralAddition}`

  switch (quantity) {
    case 0:
      partialText = zeroString
      break
    case 1:
      partialText = `${quantity} ${singularString}`
      break
    default:
      partialText = `${quantity} ${pluralAlternative}`
      break
  }

  return `${startString} ${partialText} ${endString}`.trim()
}

export const parseToLuxonDate = (stringDate: string) => DateTime.fromISO(stringDate).toFormat('F')

export const parseStringToLuxonDate = (date: number, nullValue = null, format = 'dd/LL/yyyy') =>
  date ? DateTime.fromMillis(+date).toUTC().toFormat(format) : nullValue

export const parseBooleanToString = (
  value: boolean,
  stringValues: [string, string] = ['Yes', 'No']
) => (value ? stringValues[0] : stringValues[1])

interface NullifyValueProps<ValueType> {
  value: ValueType
  nullableValue?: ValueType
  valueToShow?: ValueType
}

export const nullifyValue: <ValueType>(props: NullifyValueProps<ValueType>) => ValueType | null = ({
  value,
  nullableValue,
  valueToShow
}) => {
  return value === nullableValue ? null : (valueToShow ?? value)
}
