import { render, screen } from '@testing-library/react'
import Form from '.'
// MOCKS
import { minimalConfig, withButtons, withErrors } from './index.mocks.json'

describe('[Form]', () => {
  test('Should render the component with required props only', () => {
    render(<Form {...minimalConfig} />)
    const element = screen.getByTestId('form')
    expect(element).toBeInTheDocument()
  })

  test('Should render with the button group', () => {
    render(<Form {...{ ...minimalConfig, ...withButtons }} />)
    const element = screen.getByTestId('button-group')
    expect(element).toBeInTheDocument()
  })

  test('Should render with errors', () => {
    render(<Form {...{ ...minimalConfig, ...withErrors }} />)
    const element = screen.getByTestId('form-error')
    expect(element).toBeInTheDocument()
  })
})
