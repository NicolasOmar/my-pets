import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
// COMPONENT
import Tag from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Tag]', () => {
  const { minimal, colored, large, withDeleteBtn } = testing

  test('Should render if the component with required prop only', () => {
    render(<Tag {...minimal} />)
    const basicConfig = screen.getByTestId('test-tag-normal-white')
    expect(basicConfig).toBeInTheDocument()
  })

  test('Should not render if the component has not required props injected', () => {
    render(<Tag />)
    expect(() => screen.getByTestId('test-tag-normal-white')).toThrow()
  })

  test('Should render with a specific color and size', () => {
    const coloredConfig = { ...minimal, ...colored }
    const largeConfig = { ...minimal, ...colored, ...large }

    render(<Tag {...coloredConfig} />)
    const coloredTag = screen.getByTestId('test-tag-normal-link')
    expect(coloredTag).toBeInTheDocument()

    render(<Tag {...largeConfig} />)
    const hugeTag = screen.getByTestId('test-tag-large-link')
    expect(hugeTag).toBeInTheDocument()
  })

  test('Should render with a delete button', () => {
    const deletableConfig = { ...minimal, ...withDeleteBtn }
    render(<Tag {...deletableConfig} />)
    const deleteTag = screen.getByTestId('test-tag-delete-normal-white')
    expect(deleteTag).toBeInTheDocument()
  })

  test('Should check that it has been clicked in its text and delete button', () => {
    const clickeableBtn = {
      ...minimal,
      ...withDeleteBtn,
      onTextClick: vi.fn(),
      onDeleteClick: vi.fn()
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
