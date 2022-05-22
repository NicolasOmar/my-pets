import { fireEvent, render, screen } from '@testing-library/react'
import RadioCheckGroup from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[RadioCheckGroup]', () => {
  test('Should render the component with required props only', () => {
    render(<RadioCheckGroup {...minimalConfig} />)

    const testGroupSection = screen.getByTestId('radio-check-group')
    expect(testGroupSection).toBeInTheDocument()

    minimalConfig.options.forEach(({ label }) => {
      const testOptionLabel = screen.getByText(label)
      expect(testOptionLabel).toBeInTheDocument()
    })
  })

  test('Should check that its methods have been called', () => {
    const [singleOption] = minimalConfig.options
    const groupWithMethods = {
      ...minimalConfig,
      options: [singleOption],
      onInputChange: jest.fn(),
      onBlurChange: jest.fn()
    }

    render(<RadioCheckGroup {...groupWithMethods} />)

    const testOption = screen.getByTestId(`${singleOption.control}-${groupWithMethods.type}`)

    fireEvent.blur(testOption)
    expect(groupWithMethods.onBlurChange).toHaveBeenCalled()

    fireEvent.click(testOption)
    expect(groupWithMethods.onInputChange).toHaveBeenCalled()
  })
})
