import { render, screen } from '@testing-library/react'
import GridLayout from '.'

const mockChildren = <div>Test</div>

describe('[GridLayout]', () => {
  test('Should render the component with required props only', () => {
    render(<GridLayout />)
    const element = screen.getByTestId('grid-test-layout')
    expect(element).toBeInTheDocument()
  })

  test('Should render with "red" background color', () => {
    const redColor = 'red'
    render(<GridLayout color={redColor} children={mockChildren} />)

    const element = screen.getByTestId('grid-test-layout')
    expect(element).toBeInTheDocument()
    expect(element.children[0].className).toEqual(expect.stringContaining(redColor))
  })

  test('Should render with "isCentered" classes', () => {
    const centeredClasses = 'center aligned'
    render(<GridLayout isCentered={true} children={mockChildren} />)

    const element = screen.getByTestId('grid-test-layout')
    expect(element).toBeInTheDocument()
    expect(element.className).toEqual(expect.stringContaining(centeredClasses))
  })
})
