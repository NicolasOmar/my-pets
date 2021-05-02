import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// COMPONENTS
import App from './app'

test('renders App component without props', () => {
  render(
    <MockedProvider mocks={[]} addTypefile={false}>
      <App />
    </MockedProvider>
  )
  const element = screen.getByText(/Welcome to My Pets/i)
  expect(element).toBeInTheDocument()
})
