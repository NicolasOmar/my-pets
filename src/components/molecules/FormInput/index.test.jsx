import { describe, test, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import FormInput from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[FormInput]', () => {
  const { minimalConfig, selectConfig, checkGroupConfig } = testing

  const getInputConfig = config => {
    render(<FormInput {...config} />)
    const testFormInput = screen.getByTestId(
      `test-field-${config.inputConfig.type}-${config.inputConfig.control}`
    )
    expect(testFormInput).toBeInTheDocument()

    cleanup()
    render(<FormInput {...{ ...config, inputConfig: { ...config.inputConfig, isValid: false } }} />)
    const testInvalidFormInput = screen.getByTestId(
      `test-field-${config.inputConfig.type}-${config.inputConfig.control}`
    )
    expect(testInvalidFormInput).toBeInTheDocument()
  }

  afterEach(() => cleanup())

  test('Should render the component with required props only', () => getInputConfig(minimalConfig))
  test('Should render the component with select props only', () => getInputConfig(selectConfig))
  test('Should render the component with checkbox props only', () =>
    getInputConfig(checkGroupConfig))
})
