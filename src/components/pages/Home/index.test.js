import { render, screen } from '@testing-library/react'
// COMPONENTS
import Home from '.'
// FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'
// MOCKS
import { nameMock } from './index.mocks.json'

describe.skip('[Home]', () => {
  beforeAll(() => {
    setLoggedUser({ name: nameMock })
  })

  test('Renders with a dummy logged User', () => {
    render(<Home />)
    expect(screen.getByText(`HELLO ${nameMock.toUpperCase()}`)).toBeInTheDocument()
  })
})
