import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// COMPONENTS
import Label from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Label]', () => {
  const mockedText = testing.withLabelText.labelText.replace(' ', '-')

  test('Should render the component with required props only', () => {
    render(<Label {...testing.withLabelText} />)
    expect(screen.getByTestId(`test-label-${mockedText}`)).toBeInTheDocument()
  })

  test('Should render the component with isRequired', () => {
    const requiredLabel = {
      ...testing.withLabelText,
      ...testing.requiredVersion
    }

    render(<Label {...requiredLabel} />)
    expect(screen.getByTestId(`test-label-${mockedText}`)).toBeInTheDocument()
    expect(screen.getByTestId(`test-required-${mockedText}`)).toBeInTheDocument()
  })

  test('Should not render the component when props are not being provided', () => {
    expect(() => render(<Label />)).toThrow()
  })
})
