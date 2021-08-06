import { render, screen } from '@testing-library/react'
// COMPONENTS
import Home from '../../molecules/home/home'
// HELPER FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'

describe('[Home]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with a dummy logged User', () => {
      setLoggedUser({ name: 'Test' })
      render(<Home />)
      const element = screen.getByText(`HELLO TEST`)
      expect(element).toBeInTheDocument()
    })
  })
})
