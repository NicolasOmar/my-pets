import { render, screen } from '@testing-library/react'
import BasicFrame from '.'
// MOCKS
import { withHeader, headerTestIds } from './index.mocks.json'

describe('[BasicFrame]', () => {
  test('Should render the component with required props only', () => {
    render(<BasicFrame />)
    const firstFrameChild = screen.getByTestId('grid-test-layout-0')
    const secondFrameChild = screen.getByTestId('grid-test-layout-1')

    expect(firstFrameChild).toBeInTheDocument()
    expect(secondFrameChild).toBeInTheDocument()
  })

  test('Should render with the included Header', () => {
    render(<BasicFrame {...withHeader} />)
    headerTestIds.forEach(testId => {
      const basicFrameHeader = screen.getByTestId(testId)
      expect(basicFrameHeader).toBeInTheDocument()
    })
  })
})
