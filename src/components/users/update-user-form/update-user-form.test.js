import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// COMPONENTS
import UpdateUserForm from './update-user-form'
// HELPER FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'

test(`Renders a 'Update User' Form without props`, () => {
  setLoggedUser({
    name: 'Test',
    lastName: 'Test'
  })
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <UpdateUserForm />
    </MockedProvider>
  )
  const element = screen.getByText('Name')
  expect(element).toBeInTheDocument()
})
