import { render, screen } from '@testing-library/react'
// COMPONENTS
import HomePage from '.'
// HELPER FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'

describe('[HomePage]', () => {
  beforeAll(() => {
    const name = 'Test User'
    setLoggedUser({ name })
  })

  test('Renders with a dummy logged User', () => {
    render(<HomePage />)
    expect(screen.getByText(`HELLO ${name.toUpperCase()}`)).toBeInTheDocument()
  })
})
