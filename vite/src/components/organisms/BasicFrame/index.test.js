import { render, screen } from '@testing-library/react'
import BasicFrame from '.'
// MOCKS
import { withHeader, headerTestIds, titleTestIds } from './index.mocks.json'

describe('[BasicFrame]', () => {
  const testIds = [...headerTestIds, ...titleTestIds]

  test('Should render the component with required props only', () => {
    render(<BasicFrame />)
    headerTestIds.forEach(testId => expect(screen.getByTestId(testId)).toBeInTheDocument())
    titleTestIds.forEach(testId => expect(() => screen.getByTestId(testId)).toThrow())
  })

  test('Should render with the included Header', () => {
    render(<BasicFrame {...withHeader} />)
    testIds.forEach(testId => expect(screen.getByTestId(testId)).toBeInTheDocument())
  })
})
