import { render, screen } from '@testing-library/react'
import GridLayout from '../../app/shared/grid-layout/grid-layout'

test('render a grid with required properties', () => {
  render(<GridLayout header={{ title: 'Test' }} />)
  const element = screen.getByText('Test')
  expect(element).toBeInTheDocument()
})
