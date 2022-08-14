import { render, screen } from '@testing-library/react'
// COMPONENTS
import Card from '.'
// MOCKS
import mocks from './index.mocks.json'

describe('[Card]', () => {
  test('Should render the component with required props only', () => {
    render(<Card cardContent={mocks.testCardContent} />)
    expect(screen.getByTestId('test-card-content')).toBeInTheDocument()
  })

  test('Should render the component with cardImage', () => {
    render(<Card cardContent={mocks.testCardContent} cardImage={mocks.testBaseImage} />)
    expect(screen.getByTestId('test-card-image')).toBeInTheDocument()
  })

  test('Should render the component with cardFooter', () => {
    render(<Card cardContent={mocks.testCardContent} cardFooter={mocks.testFooterItems} />)
    expect(screen.getByTestId('test-card-content')).toBeInTheDocument()
  })
})
