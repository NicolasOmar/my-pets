import { cleanup, render, screen } from '@testing-library/react'
import GridLayout from '.'

const centeredClasses = 'is-centered'
const mockOneChild = (i = null) => {
  const props = { key: i !== null ? `test-div-${i}` : undefined }
  return (
    <div data-testid={`test-div${i ? `-${i}` : ''}`} {...props}>
      Test
    </div>
  )
}

describe('[GridLayout]', () => {
  test.skip('Should render the component with required props only', () => {
    render(<GridLayout />)

    expect(() => screen.getByTestId('grid-layout-test-0')).toThrow()
    expect(() => screen.getByTestId('grid-layout-test')).toThrow()
  })

  test('Should render with and without "centerGrid" classes', () => {
    render(<GridLayout centerGrid={true} children={mockOneChild()} />)

    let defaultGrid = screen.getByTestId('grid-layout-test')
    expect(defaultGrid).toBeInTheDocument()
    expect(defaultGrid.className).toEqual(expect.stringContaining(centeredClasses))

    cleanup()

    render(<GridLayout children={mockOneChild()} />)
    defaultGrid = screen.getByTestId('grid-layout-test')
    expect(defaultGrid.className).not.toEqual(expect.stringContaining(centeredClasses))
  })

  test('Should render with several children', () => {
    const children = new Array(3).fill(null).map((_, i) => mockOneChild(i))
    const props = { centerGrid: true, children }
    render(<GridLayout {...props} />)

    children.forEach((_, i) => {
      const childElm = screen.getByTestId(`grid-layout-test-${i}`)
      expect(childElm).toBeInTheDocument()
    })
  })
})
