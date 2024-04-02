import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import BasicRadioCheck from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[BasicRadioCheck]', () => {
  const { minimalConfig } = testing
  const minimalInputTestId = `test-${minimalConfig.control}-${minimalConfig.type}`

  test('Should render the component with required props only', () => {
    render(<BasicRadioCheck {...minimalConfig} />)
    const minimalInput = screen.getByTestId(minimalInputTestId)
    expect(minimalInput).toBeInTheDocument()
  })

  test('Should check that its methods have been called', () => {
    const inputConfig = {
      ...minimalConfig,
      onInputChange: vi.fn(),
      onBlurChange: vi.fn()
    }

    render(<BasicRadioCheck {...inputConfig} />)
    const changeableInput = screen.getByTestId(minimalInputTestId)

    fireEvent.blur(changeableInput)
    expect(inputConfig.onBlurChange).toHaveBeenCalled()

    fireEvent.click(changeableInput)
    fireEvent.change(changeableInput, { target: { value: true } })
    expect(inputConfig.onInputChange).toHaveBeenCalled()
  })
})
