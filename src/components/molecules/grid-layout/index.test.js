import { render, screen } from '@testing-library/react'
import GridLayout from '.'

const centeredClasses = 'center aligned'
const mockOneChild = i => {
  const props = { key: i !== null ? `test-div-${i}` : undefined }
  return (
    <div data-testid={`test-div${i !== null ? '-' + i : ''}`} {...props}>
      Test
    </div>
  )
}

describe('[GridLayout]', () => {
  test('Should render the component with required props only', () => {
    render(<GridLayout />)
    const minimalGridLayout = screen.getByTestId('grid-test-layout')
    expect(minimalGridLayout).toBeInTheDocument()
  })

  test('Should render with "red" background color', () => {
    const redColor = 'red'
    render(<GridLayout color={redColor} children={mockOneChild()} />)

    const redGridLayout = screen.getByTestId('grid-test-layout')
    expect(redGridLayout).toBeInTheDocument()
    expect(redGridLayout.children[0].className).toEqual(expect.stringContaining(redColor))
  })

  test('Should render with "centerGrid" classes', () => {
    render(<GridLayout centerGrid={true} children={mockOneChild()} />)

    const centeredGridLayout = screen.getByTestId('grid-test-layout')
    expect(centeredGridLayout).toBeInTheDocument()
    expect(centeredGridLayout.className).toEqual(expect.stringContaining(centeredClasses))
  })

  test('Should render with several children', () => {
    const children = new Array(3).fill(null).map((_, i) => mockOneChild(i))
    const props = { centerGrid: true, children }
    render(<GridLayout {...props} />)

    const gridWithChildren = screen.getByTestId('grid-test-layout')
    expect(gridWithChildren).toBeInTheDocument()
    expect(gridWithChildren.className).toEqual(expect.stringContaining(centeredClasses))

    children.forEach((_, i) => {
      const childElm = screen.getByTestId(`test-div-${i}`)
      expect(childElm).toBeInTheDocument()
    })
  })
})
