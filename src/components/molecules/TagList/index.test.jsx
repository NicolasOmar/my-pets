import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// COMPONENTS
import TagList from '.'

describe('[TagList]', () => {
  test('Should render the component with required props only', () => {
    const dataList = Array(5)
      .fill(null)
      .map((_, i) => ({ text: `testing-tag-${i}` }))

    render(<TagList {...{ dataList }} />)

    const testTagList = screen.getByTestId(`test-tag-list-${dataList.length}`)
    expect(testTagList).toBeInTheDocument()
    dataList.forEach(({ text }) => expect(() => screen.getByText(text).toBeInTheDocument()))
  })

  test('Should not render the component by passing an empty array or a null value', () => {
    ;[[], null, undefined].forEach(_case => {
      render(<TagList {...{ dataList: _case }} />)
      expect(() => screen.getByTestId(`test-tag-list-${_case}`)).toThrow()
    })
  })
})
