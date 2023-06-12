import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// COMPONENTS
import NavBarDropdown from '.'
// MOCKS
import { minimalConfig, withOneItem } from './index.mocks.json'

describe('[NavBarDropdown]', () => {
  test('Should render the component with required props only', () => {
    render(<NavBarDropdown {...minimalConfig} />)
    const testSection = screen.getByTestId('test-navbar-dropdown')
    const testLabel = screen.getByTestId('test-navbar-dropdown-label')
    const testLabelText = screen.getByText(minimalConfig.label)

    expect(testSection).toBeInTheDocument()
    expect(testLabel).toBeInTheDocument()
    expect(testLabelText).toBeInTheDocument()
  })

  test('Should render with one and many options', () => {
    render(<NavBarDropdown {...withOneItem} />)

    withOneItem.options.forEach(({ itemLabel }) => {
      const testOptionLabel = screen.getByText(itemLabel)
      expect(testOptionLabel).toBeInTheDocument()
    })
  })
})
