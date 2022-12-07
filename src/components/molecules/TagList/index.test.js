import { render, screen } from '@testing-library/react'
import TagList from '.'

describe('[TagList]', () => {
  test('Should render the component with required props only', () => {
    const dataList = Array(5)
      .fill(null)
      .map((_, i) => ({ text: `testing-tag-${i}` }))

    render(<TagList {...{ dataList }} />)

    const testTagList = screen.getByTestId(`test-tag-list-${dataList.length}`)
    expect(testTagList).toBeInTheDocument()
    dataList.forEach(({ text }) => expect(() => screen.getByText(text).toBeInTheDocument()))
  })
})
