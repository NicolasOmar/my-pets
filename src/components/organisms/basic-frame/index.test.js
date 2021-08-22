import { render, screen } from '@testing-library/react'
import BasicFrame from '.'
// MOCKS
import { withHeader, headerTestIds } from './index.mocks.json'

describe('[BasicFrame]', () => {
  test('Should render the component with required props only', () => {
    render(<BasicFrame />)
    const element = screen.getByTestId('grid-test-layout')
    expect(element).toBeInTheDocument()
  })

  test('Should render with the included Header', () => {
    render(<BasicFrame {...withHeader} />)
    headerTestIds.forEach(testId => {
      const element = screen.getByTestId(testId)
      expect(element).toBeInTheDocument()
    })
  })
})
