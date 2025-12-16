import { describe, test, expect } from 'vitest'
import {
  parseArrayToString,
  parseBooleanToString,
  nullifyValue,
  capitalizeWord,
  parseSingularPluralStrings
} from '../parsers'
import mocks from '../mocks/parsers.json'

describe('[Functions.parsers]', () => {
  test('parseArrayToString joins array of objects', () => {
    const testArray = mocks.parseArrayToString

    Object.keys(testArray[0]).forEach(key => {
      const prop = key as keyof (typeof testArray)[0]
      const baseResult = parseArrayToString({ rawList: testArray, prop })
      expect(baseResult).toBe(testArray.map(item => item[prop]).join(', '))

      const customSeparatorResult = parseArrayToString({
        rawList: testArray,
        prop,
        separator: ' | '
      })
      expect(customSeparatorResult).toBe(testArray.map(item => item[prop]).join(' | '))
    })
  })

  test('parseBooleanToString returns correct string', () => {
    mocks.parseBooleanToString.inputs.forEach((testCase, testCaseIndex) => {
      const result = parseBooleanToString(...(testCase as [boolean, [string, string]?]))
      expect(result).toBe(mocks.parseBooleanToString.outputs[testCaseIndex])
    })
  })

  test('nullifyValue returns null for nullableValue', () => {
    mocks.nullifyValue.inputs.forEach((testCase, testCaseIndex) => {
      const result = nullifyValue({
        value: testCase.value,
        nullableValue: testCase.nullableValue,
        valueToShow: testCase.valueToShow ?? undefined
      })
      expect(result).toBe(mocks.nullifyValue.outputs[testCaseIndex])
    })
  })

  test('capitalizeWord capitalizes first letter', () => {
    mocks.capitalizeWord.inputs.forEach((testCase, testCaseIndex) => {
      const result = capitalizeWord(testCase)
      expect(result).toBe(mocks.capitalizeWord.outputs[testCaseIndex])
    })
  })

  test('parseSingularPluralStrings returns correct string', () => {
    mocks.parseSingularPluralStrings.inputs.forEach((testCase, testCaseIndex) => {
      const result = parseSingularPluralStrings(testCase)
      expect(result).toBe(mocks.parseSingularPluralStrings.outputs[testCaseIndex])
    })
  })
})
