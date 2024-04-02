import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import RadioCheckGroup from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[RadioCheckGroup]', () => {
  const { minimalConfig } = testing

  test('Should render the component with required props only', () => {
    render(<RadioCheckGroup {...minimalConfig} />)

    const testGroupSection = screen.getByTestId('test-radio-check-group')
    expect(testGroupSection).toBeInTheDocument()

    minimalConfig.options.forEach(({ label }) => {
      const testOptionLabel = screen.getByText(label)
      expect(testOptionLabel).toBeInTheDocument()
    })
  })

  test('Should render the component with checkbox options', () => {
    const checkConfig = {
      ...minimalConfig,
      type: 'checkbox',
      value: minimalConfig.options.map(({ control }) => control),
      options: minimalConfig.options.map(option => ({ ...option, type: 'checkbox' }))
    }

    render(<RadioCheckGroup {...checkConfig} />)
    expect(screen.getByTestId('test-radio-check-group')).toBeInTheDocument()

    checkConfig.options.forEach(({ label, control }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
      expect(screen.getByTestId(`test-${control}-${checkConfig.type}`)).toBeInTheDocument()
    })
  })

  test('Should check that its methods have been called as radio buttons', () => {
    const [singleOption] = minimalConfig.options
    const groupWithMethods = {
      ...minimalConfig,
      options: [singleOption],
      onInputChange: vi.fn(),
      onBlurChange: vi.fn()
    }

    render(<RadioCheckGroup {...groupWithMethods} />)

    const testOption = screen.getByTestId(`test-${singleOption.control}-${groupWithMethods.type}`)

    fireEvent.blur(testOption)
    expect(groupWithMethods.onBlurChange).toHaveBeenCalled()

    fireEvent.click(testOption)
    expect(groupWithMethods.onInputChange).toHaveBeenCalled()
  })

  test('Should check that its methods have been called as checkboxes', () => {
    const [singleOption] = minimalConfig.options.map(option => ({ ...option, type: 'checkbox' }))
    const checkConfigWithMethods = {
      ...minimalConfig,
      type: 'checkbox',
      options: [singleOption],
      onInputChange: vi.fn(),
      onBlurChange: vi.fn()
    }

    render(<RadioCheckGroup {...checkConfigWithMethods} />)

    const testOption = screen.getByTestId(
      `test-${singleOption.control}-${checkConfigWithMethods.type}`
    )

    fireEvent.blur(testOption)
    expect(checkConfigWithMethods.onBlurChange).toHaveBeenCalled()

    fireEvent.click(testOption)
    expect(checkConfigWithMethods.onInputChange).toHaveBeenCalled()
  })
})
