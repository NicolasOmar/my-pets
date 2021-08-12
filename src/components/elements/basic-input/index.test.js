import { fireEvent, render, screen } from '@testing-library/react'
// COMPONENTS
import BasicInput from '.'
// MOCKS
import { minimalConfig, styled } from './index.mocks.json'

describe('[BasicInput]', () => {
  test('Should render the component with required props only', () => {
    render(<BasicInput {...minimalConfig} />)
    const minimalElement = screen.getByTestId(`${minimalConfig.control}-${minimalConfig.type}`)
    expect(minimalElement).toBeInTheDocument()
  })

  test('Should render the component with styles', () => {
    render(<BasicInput {...{ ...minimalConfig, ...styled }} />)
    const styledElement = screen.getByTestId('styled-input')
    expect(styledElement).toBeInTheDocument()
  })

  test('Should check that its methods have been called', () => {
    const changeableInput = {
      ...minimalConfig,
      onInputChange: jest.fn(),
      onBlurChange: jest.fn()
    }

    render(<BasicInput {...changeableInput} />)
    const element = screen.getByTestId(`${minimalConfig.control}-${minimalConfig.type}`)

    fireEvent.blur(element)
    expect(changeableInput.onBlurChange).toHaveBeenCalled()

    fireEvent.click(element)
    fireEvent.change(element, { target: { value: 't' } })
    expect(changeableInput.onInputChange).toHaveBeenCalled()
  })
})
