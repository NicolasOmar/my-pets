import { render, screen } from '@testing-library/react'
import LoginForm from '../../app/core/login-form/login-form'

test(`Renders a 'Login' Form without props`, () => {
  render(<LoginForm />)
  const element = screen.getByText('Password')
  expect(element).toBeInTheDocument()
})
