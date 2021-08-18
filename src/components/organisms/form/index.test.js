import { render, screen } from '@testing-library/react'
import Form from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[Form]', () => {
  test('Should render the component with required props only', () => {
    render(<Form {...minimalConfig} />)
    const element = screen.getByTestId('form')
    expect(element).toBeInTheDocument()
  })
})
