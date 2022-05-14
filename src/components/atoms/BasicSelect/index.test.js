// MOCKS
import { render, screen } from '@testing-library/react'
import BasicSelect from '.'
import { minimalConfig, oneOption } from './index.mocks.json'

describe('[BasicSelect]', () => {
  const selectTestId = `test-single-${minimalConfig.control}`

  test('Should render the component with required props only', () => {
    render(<BasicSelect {...minimalConfig} />)
    const minimalSelect = screen.getByTestId(selectTestId)
    expect(minimalSelect).toBeInTheDocument()
  })

  test('Should render the component with at least one option', () => {
    render(<BasicSelect {...{ ...minimalConfig, ...oneOption }} />)
    oneOption.options.forEach((_, i) => {
      const oneOptionSelect = screen.getByTestId(`test-select-option-${i}`)
      expect(oneOptionSelect).toBeInTheDocument()
    })
  })
})
