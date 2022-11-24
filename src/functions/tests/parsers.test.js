import {
  parseGraphToObj,
  capitalizeWord,
  parseArrayToString,
  parseBooleanToString,
  parseDate,
  parseDropdownOptions,
  parseFormDataToObj,
  parseNumber,
  searchNamesFromIds,
  searchIdsFromNames,
  parseDateString
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
  describe('[parseGraphToObj]', () => {
    test('Should run with the required arguments', () => {
      const {
        parseGraphToObj: { graphObj, originalObj }
      } = mocks
      expect(parseGraphToObj(graphObj, originalObj)).toEqual(graphObj)
    })
  })

  describe.skip('[parseConfigToClassName]', () => {})

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

  describe('[parseBooleanToString]', () => {
    test('Should return the expected cases', () => {
      const { goodCases, goodResults, badCases, badResults } = mocks.parseBooleanToString

      goodCases.forEach((_case, i) =>
        expect(parseBooleanToString(_case, goodResults[i], badResults[i])).toEqual(goodResults[i])
      )

      badCases.forEach((_case, i) =>
        expect(parseBooleanToString(_case, goodResults[i], badResults[i])).toEqual(badResults[i])
      )
    })
  })

  describe('[parseDate]', () => runGoodBadCases(mocks.parseDate, parseDate))

  describe('[parseDateString]', () => runGoodBadCases(mocks.parseDateString, parseDateString))

  describe('[parseArrayToString]', () => {
    test('Should return the expected cases', () => {
      Object.keys(mocks.parseArrayToString).forEach(caseKey => {
        const { rawData, parsedData, separator } = mocks.parseArrayToString[caseKey]
        expect(parseArrayToString(rawData, caseKey, separator)).toEqual(parsedData)
      })
    })

    test('Should return the expected cases with default separator', () => {
      const { rawData, parsedData } = mocks.parseArrayToString.numberCase
      expect(parseArrayToString(rawData, 'numberCase')).toEqual(parsedData)
    })
  })

  describe('[parseFormDataToObj]', () => {
    test('Should run with the required arguments', () => {
      const {
        parseFormDataToObj: { raw, final }
      } = mocks
      expect(parseFormDataToObj(raw)).toEqual(final)
    })

    test('Should return an empty object if you send no params', () => {
      expect(parseFormDataToObj()).toEqual({})
    })
  })

  describe('[searchIdsFromNames]', () => {
    test('Should return the expected string array based on an id object array', () => {
      const { ids, stringList, result } = mocks.searchIdsFromNames.idArray
      expect(searchIdsFromNames(ids, stringList)).toEqual(result)
    })

    test('Should return the expected single string based on an single id object', () => {
      const {
        ids: [idObj],
        stringList,
        result
      } = mocks.searchIdsFromNames.idArray
      expect(searchIdsFromNames(idObj, stringList)).toEqual(result[0])
    })

    test('Should return the id string based on an single id object without any stringList', () => {
      const [idObj] = mocks.searchIdsFromNames.idArray.ids
      expect(searchIdsFromNames(idObj, undefined)).toEqual(idObj.id)
    })
  })

  describe('[searchNamesFromIds]', () => {
    test('Should run with multipleSearch', () => {
      const { list, items, result, searchMultiple } = mocks.searchNamesFromIds.withMultipleSearch
      expect(searchNamesFromIds(items, list, searchMultiple)).toEqual(result)
    })

    test('Should run without multipleSearch', () => {
      const { list, items, result } = mocks.searchNamesFromIds.withoutMultipleSearch
      expect(searchNamesFromIds(items, list)).toEqual(result)
    })

    test('Should return null or [] in case ids or list arguments are not provided', () => {
      const { list, items, searchMultiple } = mocks.searchNamesFromIds.withMultipleSearch
      expect(searchNamesFromIds(undefined, list, searchMultiple)).toEqual(null)
      expect(searchNamesFromIds(items, undefined, searchMultiple)).toEqual([])
      expect(searchNamesFromIds(undefined, list)).toEqual(null)
      expect(searchNamesFromIds(items, undefined)).toEqual(null)
    })
  })

  describe('[capitalizeWord]', () => {
    test('Should return the expected cases', () => {
      const { cases, results } = mocks.capitalizeWord
      cases.forEach((_case, i) => expect(capitalizeWord(_case)).toEqual(results[i]))
    })
  })
})
