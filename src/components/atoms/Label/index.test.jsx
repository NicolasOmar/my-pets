import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Label from '.'
// MOCKS
import mocks from './index.mocks.json'

describe('[Label]', () => {
  const mockedText = mocks.labelText.replace(' ', '-')
  test('Should render the component with labelText only', () => {
    render(<Label labelText={mocks.labelText} />)
    expect(screen.getByTestId(`test-label-${mockedText}`)).toBeInTheDocument()
  })

  test('Should render the component with isRequired', () => {
    render(<Label {...mocks} />)
    expect(screen.getByTestId(`test-label-${mockedText}`)).toBeInTheDocument()
    expect(screen.getByTestId(`test-required-${mockedText}`)).toBeInTheDocument()
  })

  test('Should not render the component when props are not being provided', () => {
    render(<Label />)
    expect(() => screen.getByTestId(`test-label-${mockedText}`)).toThrow()
    expect(() => screen.getByTestId(`test-required-${mockedText}`)).toThrow()
  })
})
