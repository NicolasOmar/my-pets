import {
  mergeGraphObj,
  parseDate,
  parseDropdownOptions,
  parseFormData,
  parseNumber
} from '../parsers'
// MOCKS
import mocks from '../mocks/parsers.mocks.json'

const runGoodBadCases = (mocks, fn) => {
  mocks.goodCases &&
    test('Should return the expected happy/good cases', () => {
      mocks.goodCases.forEach((goodCase, i) => expect(fn(goodCase)).toEqual(mocks.goodResults[i]))
    })
  mocks.badCases &&
    test('Should return the expected sad/bad cases', () => {
      mocks.badCases.forEach((badCase, i) => expect(fn(badCase)).toEqual(mocks.badResults[i]))
    })
}

describe('[Funtions.parsers]', () => {
  describe('[mergeGraphObj]', () => {
    test('Should run with the required arguments', () => {
      const {
        mergeGraphObj: { graphObj, originalObj }
      } = mocks
      expect(mergeGraphObj(graphObj, originalObj)).toEqual(graphObj)
    })
  })

  describe.skip('[parseObjKeys]', () => {})

  describe('[parseDropdownOptions]', () => {
    test('Should run with the required arguments', () => {
      const {
        parseDropdownOptions: { raw, final }
      } = mocks
      expect(parseDropdownOptions({ selection: raw })).toEqual(final)
    })

    test('Should return an empty array if you send and empty object', () => {
      expect(parseDropdownOptions({})).toEqual([])
    })
  })

  describe('[parseNumber]', () => runGoodBadCases(mocks.parseNumber, parseNumber))

  describe('[parseDate]', () => runGoodBadCases(mocks.parseDate, parseDate))

  describe('[parseFormData]', () => {
    test('Should run with the required arguments', () => {
      const {
        parseFormData: { raw, final }
      } = mocks
      expect(parseFormData(raw)).toEqual(final)
    })

    test('Should return an empty object if you send no params', () => {
      expect(parseFormData()).toEqual({})
    })
  })
})
