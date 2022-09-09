// MOCKS
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import BasicSelect from '.'
import { minimalConfig, oneOption } from './index.mocks.json'

describe('[BasicSelect]', () => {
  const singleSelectTestId = `test-single-${minimalConfig.control}`
  const multiSelectTestId = `test-multiple-${minimalConfig.control}`
  const oneOptionConfig = { ...minimalConfig, ...oneOption }
  const multipleOptionsConfig = {
    ...oneOptionConfig,
    options: Array(5)
      .fill(null)
      .map((_, i) => ({ label: `Option ${i}`, value: `${i}` }))
  }
  const runOptionCases = options => {
    options.forEach((_, i) =>
      expect(screen.getByTestId(`test-select-option-${i}`)).toBeInTheDocument()
    )
  }

  test('Should render the component with required props only', () => {
    render(<BasicSelect {...minimalConfig} />)
    expect(screen.getByTestId(singleSelectTestId)).toBeInTheDocument()
  })

  test('Should render the component with at least one option', () => {
    render(<BasicSelect {...oneOptionConfig} />)
    runOptionCases(oneOptionConfig.options)
  })

  test('Should render the component with a null option at the first', () => {
    render(<BasicSelect {...{ ...oneOptionConfig, firstNullOption: true }} />)
    runOptionCases([null, ...oneOptionConfig.options])
  })

  test('Should render the component with at least multiple options', () => {
    render(<BasicSelect {...multipleOptionsConfig} />)
    runOptionCases(multipleOptionsConfig.options)

    cleanup()

    render(<BasicSelect {...{ ...multipleOptionsConfig, isMultiple: true }} />)
    expect(screen.getByTestId(multiSelectTestId)).toBeInTheDocument()
    runOptionCases(multipleOptionsConfig.options)
  })

  test('Should that its methods have been called when is single options', () => {
    const singlePlayConfig = {
      ...multipleOptionsConfig,
      onInputChange: jest.fn(),
      onBlurChange: jest.fn()
    }

    render(<BasicSelect {...singlePlayConfig} />)
    const playableSelect = screen.getByTestId(singleSelectTestId)

    fireEvent.click(playableSelect)
    fireEvent.change(playableSelect, { target: { value: singlePlayConfig.options[0].value } })
    expect(singlePlayConfig.onInputChange).toHaveBeenCalled()
    expect(playableSelect.value).toBe(singlePlayConfig.options[0].value)

    fireEvent.blur(playableSelect)
    expect(singlePlayConfig.onBlurChange).toHaveBeenCalled()
  })

  test('Should that its methods have been called when is multiple options', () => {
    const multiPlayConfig = {
      ...multipleOptionsConfig,
      optionsShown: 3,
      isMultiple: true,
      onInputChange: jest.fn(),
      onBlurChange: jest.fn()
    }
    const [optionOne, optionTwo, optionThree, _] = multipleOptionsConfig.options

    render(<BasicSelect {...multiPlayConfig} />)
    const playableSelect = screen.getByTestId(multiSelectTestId)

    fireEvent.click(playableSelect, { target: { value: optionOne.value } })
    expect(multiPlayConfig.onInputChange).toHaveBeenCalled()
    expect(screen.getByRole('option', { name: optionOne.label }).selected).toBe(true)

    fireEvent.click(playableSelect, { target: { value: optionTwo.value }, ctrlKey: true })
    expect(screen.getByRole('option', { name: optionOne.label }).selected).toBe(true)
    expect(screen.getByRole('option', { name: optionTwo.label }).selected).toBe(true)
    expect(multiPlayConfig.onInputChange).toHaveBeenCalledTimes(2)

    fireEvent.click(playableSelect, { target: { value: optionThree.value }, shiftKey: true })
    expect(screen.getByRole('option', { name: optionOne.label }).selected).toBe(true)
    expect(screen.getByRole('option', { name: optionTwo.label }).selected).toBe(true)
    expect(screen.getByRole('option', { name: optionThree.label }).selected).toBe(true)

    fireEvent.click(playableSelect, {
      target: { value: optionOne.value },
      ctrlKey: true,
      shiftKey: true
    })
    expect(screen.getByRole('option', { name: optionOne.label }).selected).toBe(true)
    expect(screen.getByRole('option', { name: optionTwo.label }).selected).toBe(false)
    expect(screen.getByRole('option', { name: optionThree.label }).selected).toBe(false)

    expect(multiPlayConfig.onInputChange).toHaveBeenCalledTimes(4)
  })
})
