import { render, screen } from '@testing-library/react'
// COMPONENTS
import HomePage from '.'
// HELPER FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'

describe('[HomePage]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with a dummy logged User', () => {
      setLoggedUser({ name: 'Test' })
      render(<HomePage />)
      const element = screen.getByText(`HELLO TEST`)
      expect(element).toBeInTheDocument()
    })
  })
})
