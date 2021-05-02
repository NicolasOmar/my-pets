import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
// COMPONENTS
import Header from './header'

test('Render Header with a dummy "name" prop', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Header name={'TEST'} />
    </MockedProvider>
  )
  const element = screen.getByText('TEST')
  expect(element).toBeInTheDocument()
})
