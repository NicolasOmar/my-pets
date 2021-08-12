import { render, screen } from '@testing-library/react'
// COMPONENT
import Title from '.'
// MOCKS
import mocks from './index.mocks.json'

describe('[Title]', () => {
  test('Should render the component with required props only', () => {
    render(<Title {...mocks.minimalConfig} />)
    const element = screen.getByText(mocks.minimalConfig.title)
    expect(element).toBeInTheDocument()
  })
})
