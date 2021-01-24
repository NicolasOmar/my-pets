import { render, screen } from '@testing-library/react'
import NewUserForm from '../../app/users/new-user-form/new-user-form'

test(`Renders a 'New User' Form without props`, () => {
  render(<NewUserForm />)
  const element = screen.getByText('Password')
  expect(element).toBeInTheDocument()
})
