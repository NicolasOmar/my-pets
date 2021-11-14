import { render, screen } from '@testing-library/react'
import GridLayout from '.'

const centeredClasses = 'is-centered'
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
    expect(minimalGridLayout).not.toBeInTheDocument()
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

    children.forEach((_, i) => {
      const childElm = screen.getByTestId(`grid-test-layout-${i}`)
      expect(childElm).toBeInTheDocument()
    })
  })
})
