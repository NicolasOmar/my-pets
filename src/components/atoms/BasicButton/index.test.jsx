import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENT
import BasicButton from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[BasicButton]', () => {
  const { minimalConfig, disabled } = testing
  let btnTestId = `test-${minimalConfig.type}-button-${minimalConfig.color}`

  test('Should render the component with required props only', () => {
    render(<BasicButton {...minimalConfig} />)
    const basicBtn = screen.getByTestId(btnTestId)
    expect(basicBtn).toBeInTheDocument()
  })

  test('Should check that it has been clicked', () => {
    const clickeableBtn = {
      ...minimalConfig,
      onClick: vi.fn()
    }

    render(<BasicButton {...clickeableBtn} />)
    const clickeableElm = screen.getByTestId(btnTestId)

    fireEvent.click(clickeableElm)
    expect(clickeableBtn.onClick).toHaveBeenCalled()
    expect(clickeableBtn.onClick).toHaveBeenCalledTimes(1)
  })

  test('Should check that it has not been clicked because it is disabled', () => {
    const notClickeableBtn = {
      ...minimalConfig,
      ...disabled,
      onClick: vi.fn()
    }

    render(<BasicButton {...notClickeableBtn} />)
    const disabledElm = screen.getByTestId(btnTestId)

    fireEvent.click(disabledElm)
    expect(notClickeableBtn.onClick).not.toHaveBeenCalled()
    expect(notClickeableBtn.onClick).toHaveBeenCalledTimes(0)
  })
})
