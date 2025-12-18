import { DateTime } from 'luxon'
import { DATE_FOR_DISPLAY } from '@constants/formats'
import { Entity } from '@interfaces/graphql'

interface ParseArrayToStringProps<T> {
  rawList: T[]
  prop: keyof T
  separator?: string
}

interface ParseSingularPluralStringsProps {
  quantity?: number
  zeroString?: string
  singularString?: string
  pluralString?: string
  pluralAddition?: string
  startString?: string
  endString?: string
}

export const parseArrayToString: <T>(props: ParseArrayToStringProps<T>) => string = ({
  rawList,
  prop,
  separator = ', '
}) => rawList.map(item => item[prop]).join(separator)

export const parseToLuxonDate = (stringDate: string) =>
  DateTime.fromISO(stringDate).toFormat('yyyy-MM-dd')

export const parseStringToLuxonDate = (
  date?: number | string | null,
  nullValue: string | number | null = null,
  format = DATE_FOR_DISPLAY
) => (date ? DateTime.fromMillis(+date).toUTC().toFormat(format) : nullValue)

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

export const getDataFromArrays = (
  formDataList: string[],
  dataList: Entity[],
  propToSearchBy: keyof Entity,
  propToReturn: keyof Entity
): string[] => {
  let dataToReturn: string[] = []
  for (const item of formDataList) {
    const foundItem = dataList.find(dataItem => dataItem[propToSearchBy] === item)
    if (foundItem) {
      dataToReturn = [...dataToReturn, foundItem[propToReturn].toString()]
    }
  }
  return dataToReturn
}

// FUNCTIONS TO BE USED
export const capitalizeWord = (word: string) =>
  word ? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}` : ''

export const parseSingularPluralStrings = ({
  quantity = 0,
  zeroString = 'no data',
  singularString = 'singular',
  pluralString,
  pluralAddition = 's',
  startString = '',
  endString = ''
}: ParseSingularPluralStringsProps) => {
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
