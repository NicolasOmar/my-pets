import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import TagList from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[TagList]', () => {
  const { testDataListText } = testing

  test('Should render the component with required props only', () => {
    const testDataList = Array(5)
      .fill(null)
      .map((_, i) => ({ text: `testing-tag-${i}` }))

    render(<TagList {...{ dataList: testDataList }} />)

    const testTagList = screen.getByTestId(testDataListText)
    expect(testTagList).toBeInTheDocument()
    testDataList.forEach(({ text }) => expect(() => screen.getByText(text).toBeInTheDocument()))
  })

  test('Should not render the component by passing an empty array or a null value', () => {
    ;[null, undefined].forEach(_case => {
      render(<TagList {...{ dataList: _case }} />)
      expect(() => screen.getByTestId(testDataListText)).toThrow()
    })
  })
})
