import { render, screen } from '@testing-library/react'
import FormInput from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[FormInput]', () => {
  test('Should render the component with required props only', () => {
    render(<FormInput {...minimalConfig} />)
    const minimalFormInput = screen.getByText(minimalConfig.inputLabel)
    expect(minimalFormInput).toBeInTheDocument()
  })
})
