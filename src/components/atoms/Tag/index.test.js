import { render, screen } from '@testing-library/react'
import Tag from '.'

describe('[Tag]', () => {
  test('Should render the component with required props only', () => {
    render(<Tag />)
    const basicTag = screen.getByTestId('test-tag-is-normal-is-white')
    expect(basicTag).toBeInTheDocument()
  })
})
