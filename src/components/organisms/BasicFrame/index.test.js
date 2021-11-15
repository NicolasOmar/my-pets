import { render, screen } from '@testing-library/react'
import BasicFrame from '.'
// MOCKS
import { withHeader, headerTestIds } from './index.mocks.json'

describe('[BasicFrame]', () => {
  test('Should render with the included Header', () => {
    render(<BasicFrame {...withHeader} />)
    headerTestIds.forEach(testId => {
      const basicFrameHeader = screen.getByTestId(testId)
      expect(basicFrameHeader).toBeInTheDocument()
    })
  })
})
