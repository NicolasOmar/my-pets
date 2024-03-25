import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import BasicInput from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[BasicInput]', () => {
  const { minimalConfig } = testing
  const minimalInputTestId = `test-${minimalConfig.control}-${minimalConfig.type}`

  test('Should render the component with required props only', () => {
    render(<BasicInput {...minimalConfig} />)
    const minimalInput = screen.getByTestId(minimalInputTestId)
    expect(minimalInput).toBeInTheDocument()
  })

  test('Should check that its methods have been called', () => {
    const inputConfig = {
      ...minimalConfig,
      onInputChange: vi.fn(),
      onBlurChange: vi.fn()
    }

    render(<BasicInput {...inputConfig} />)
    const clickeableInput = screen.getByTestId(minimalInputTestId)

    fireEvent.blur(clickeableInput)
    expect(inputConfig.onBlurChange).toHaveBeenCalled()

    fireEvent.click(clickeableInput)
    fireEvent.change(clickeableInput, { target: { value: 't' } })
    expect(inputConfig.onInputChange).toHaveBeenCalled()
  })
})
