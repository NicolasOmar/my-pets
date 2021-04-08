import { render, screen } from '@testing-library/react'
import Home from './home'
import { setLoggedUser } from '../../../helpers/local-storage'

test('Renders with a dummy logged User', () => {
  setLoggedUser({ name: 'Test' })
  render(<Home />)
  const element = screen.getByText(`HELLO TEST`)
  expect(element).toBeInTheDocument()
})
