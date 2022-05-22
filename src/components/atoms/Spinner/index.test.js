import { render, screen } from '@testing-library/react'
// COMPONENTS
import Spinner from '.'

describe('[Spinner]', () => {
  test('Should render the component with required props only', () => {
    render(<Spinner />)
    const minimalSpinner = screen.getByTestId('test-spinner')
    expect(minimalSpinner).toBeInTheDocument()
  })
})
