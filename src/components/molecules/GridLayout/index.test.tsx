import React from 'react'
import { describe, test, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import GridLayout from '.'
// MOCKS
import { testing } from './index.mocks.json'

const { testText, centeredClasses } = testing

const mockOneChild = (i = null) => {
  const props = { key: i !== null ? `test-div-${i}` : undefined }
  return (
    <div data-testid={`test-div${i ? `-${i}` : ''}`} {...props}>
      {testText}
    </div>
  )
}

describe('[GridLayout]', () => {
  test('Should render the component with required props only', () => {
    render(<GridLayout />)

    expect(() => screen.getByTestId('test-grid-layout-0')).toThrow()
    expect(() => screen.getByTestId('test-grid-layout')).not.toThrow()
  })

  test('Should render with and without "centerGrid" classes', () => {
    render(<GridLayout centerGrid={true} children={mockOneChild()} />)

    let defaultGrid = screen.getByTestId('test-grid-layout')
    expect(defaultGrid).toBeInTheDocument()
    expect(defaultGrid.className).toEqual(expect.stringContaining(centeredClasses))

    cleanup()

    render(<GridLayout children={mockOneChild()} />)
    defaultGrid = screen.getByTestId('test-grid-layout')
    expect(defaultGrid.className).not.toEqual(expect.stringContaining(centeredClasses))
  })

  test('Should render with several children', () => {
    const children = new Array(3).fill(null).map((_, i) => mockOneChild(i))
    const props = { centerGrid: true, children }
    render(<GridLayout {...props} />)

    children.forEach((_, i) => {
      const childElm = screen.getByTestId(`test-grid-layout-${i}`)
      expect(childElm).toBeInTheDocument()
    })
  })
})
