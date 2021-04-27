import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// COMPONENTS
import LoginForm from './login-form'

test(`Renders a 'Login' Form without props`, () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <LoginForm />
    </MockedProvider>
  )
  const element = screen.getByText('Password')
  expect(element).toBeInTheDocument()
})
