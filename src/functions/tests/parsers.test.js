import { mergeGraphObj } from '../parsers'
// MOCKS
import { testMock } from '../mocks/parsers.mocks.json'

describe('[Funtions.parsers]', () => {
  describe('[mergeGraphObj]', () => {
    test('Should run with the required arguments', () => {
      const mergedObj = mergeGraphObj(testMock.graphObj, testMock.originalObj)
      expect(mergedObj).toEqual(testMock.graphObj)
    })
  })
})
