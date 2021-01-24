import { render, screen } from '@testing-library/react'
import UpdateUserForm from '../../app/users/update-user-form/update-user-form'
import { setLoggedUser } from '../../helpers/local-storage'

test(`Renders a 'Update User' Form without props`, () => {
  setLoggedUser({
    name: 'Test',
    lastName: 'Test'
  })
  render(<UpdateUserForm />)
  const element = screen.getByText('Name')
  expect(element).toBeInTheDocument()
})
