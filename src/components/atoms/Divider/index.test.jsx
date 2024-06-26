import { describe, test, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import Divider from '.'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Divider]', () => {
  const { baseTestId } = testing

  test('Should render the component with required props only', () => {
    render(<Divider />)
    const minimalDivider = screen.getByTestId(baseTestId)
    expect(minimalDivider).toBeInTheDocument()
  })

  test('Should render with a different color', () => {
    const colors = parseObjKeys(textColors)

    colors.forEach(color => {
      render(<Divider {...{ color }} />)
      const coloredDivider = screen.getByTestId(`test-divider-${color}`)
      expect(coloredDivider).toBeInTheDocument()
    })
  })
})
