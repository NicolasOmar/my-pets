import validators from '../validators'
import {
  mockValueIsEmpty,
  mockValueHasNumbers,
  mockValueLengthIsUnder,
  mockValueLengthIsAbove,
  mockDateIsBefore
} from '../mocks/validators.mocks.json'

const testSuite = [
  {
    name: '[valueIsEmpty]',
    values: mockValueIsEmpty,
    testFn: validators.valueIsEmpty
  },
  {
    name: '[valueHasNumbers]',
    values: mockValueHasNumbers,
    testFn: validators.valueHasNumbers
  },
  {
    name: '[valueLengthIsUnder]',
    values: mockValueLengthIsUnder,
    testFn: validators.valueLengthIsUnder,
    otherProps: 5
  },
  {
    name: '[valueLengthIsAbove]',
    values: mockValueLengthIsAbove,
    testFn: validators.valueLengthIsAbove,
    otherProps: 6
  },
  {
    name: '[dateIsBefore]',
    values: mockDateIsBefore,
    testFn: validators.dateIsBefore,
    otherProps: new Date()
  }
]

const checkValue = (valueMockArray, testFunction, otherProps = null) => {
  valueMockArray.forEach((value, i) =>
    expect(testFunction(value, otherProps))[i <= 1 ? 'toBeTruthy' : 'toBeFalsy']()
  )
}

describe('[Functions.validators]', () => {
  testSuite.forEach(({ name, values, testFn, otherProps = null }) =>
    test(name, () => checkValue(values, testFn, otherProps))
  )
})
