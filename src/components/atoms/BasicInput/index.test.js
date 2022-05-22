import { fireEvent, render, screen } from '@testing-library/react'
// COMPONENTS
import BasicInput from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[BasicInput]', () => {
  const minimalInputTestId = `${minimalConfig.control}-${minimalConfig.type}`

  test('Should render the component with required props only', () => {
    render(<BasicInput {...minimalConfig} />)
    const minimalInput = screen.getByTestId(minimalInputTestId)
    expect(minimalInput).toBeInTheDocument()
  })

  test('Should check that its methods have been called', () => {
    const inputConfig = {
      ...minimalConfig,
      onInputChange: jest.fn(),
      onBlurChange: jest.fn()
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
