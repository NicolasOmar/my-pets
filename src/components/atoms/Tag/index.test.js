import { fireEvent, render, screen } from '@testing-library/react'
import Tag from '.'
// MOCKS
import mocks from './index.mocks.json'

describe('[Tag]', () => {
  test('Should render the component with required props only', () => {
    render(<Tag />)
    const basicTag = screen.getByTestId('test-tag-normal-white')
    expect(basicTag).toBeInTheDocument()
  })

  test('Should render with a specific color and size', () => {
    render(<Tag {...mocks.colored} />)
    const coloredTag = screen.getByTestId('test-tag-normal-link')
    expect(coloredTag).toBeInTheDocument()

    render(<Tag {...{ ...mocks.colored, ...mocks.large }} />)
    const hugeTag = screen.getByTestId('test-tag-large-link')
    expect(hugeTag).toBeInTheDocument()
  })

  test('Should render with a delete button', () => {
    render(<Tag {...{ ...mocks.withDeleteBtn }} />)
    const deleteTag = screen.getByTestId('test-tag-delete-normal-white')
    expect(deleteTag).toBeInTheDocument()
  })

  test('Should check that it has been clicked in its text and delete button', () => {
    const clickeableBtn = {
      ...mocks.withDeleteBtn,
      onTextClick: jest.fn(),
      onDeleteClick: jest.fn()
    }

    render(<Tag {...clickeableBtn} />)
    const clickeableText = screen.getByTestId('test-tag-normal-white')
    const clickeableDelete = screen.getByTestId('test-tag-delete-normal-white')

    fireEvent.click(clickeableText)
    expect(clickeableBtn.onTextClick).toHaveBeenCalled()
    expect(clickeableBtn.onTextClick).toHaveBeenCalledTimes(1)
    fireEvent.click(clickeableDelete)
    expect(clickeableBtn.onDeleteClick).toHaveBeenCalled()
    expect(clickeableBtn.onDeleteClick).toHaveBeenCalledTimes(1)
  })
})
