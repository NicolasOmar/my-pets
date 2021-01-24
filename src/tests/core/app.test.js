import { render, screen } from '@testing-library/react'
import App from '../../app/core/app/app'

test('renders App component without props', () => {
  render(<App />)
  const element = screen.getByText(/Welcome to My Pets/i)
  expect(element).toBeInTheDocument()
})
