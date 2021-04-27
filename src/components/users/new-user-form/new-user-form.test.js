import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// COMPONENTS
import NewUserForm from './new-user-form'

test(`Renders a 'New User' Form without props`, () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <NewUserForm />
    </MockedProvider>
  )
  const element = screen.getByText('Password')
  expect(element).toBeInTheDocument()
})
