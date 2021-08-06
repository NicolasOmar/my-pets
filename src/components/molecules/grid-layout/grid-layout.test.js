import { render, screen } from '@testing-library/react'
import GridLayout from './grid-layout'

describe('[GridLayout]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with required properties only', () => {
      render(<GridLayout header={{ title: 'Test' }} />)
      const element = screen.getByText('Test')
      expect(element).toBeInTheDocument()
    })
  })
})
