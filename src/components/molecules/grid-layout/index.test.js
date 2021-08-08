import { render, screen } from '@testing-library/react'
import GridLayout from '.'

describe('[GridLayout]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with required properties only', () => {
      render(<GridLayout />)
      const element = screen.getByTestId('grid-test-layout')
      expect(element).toBeInTheDocument()
    })
  })
})
