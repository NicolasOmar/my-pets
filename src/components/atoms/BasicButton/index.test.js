import { fireEvent, render, screen } from '@testing-library/react'
import BasicButton from '.'
// MOCKS
import { minimalConfig, disabled } from './index.mocks.json'

describe('[BasicButton]', () => {
  let btnTestId = `${minimalConfig.type}-button-${minimalConfig.color}`

  test('Should render the component with required props only', () => {
    render(<BasicButton {...minimalConfig} />)
    const basicBtn = screen.getByTestId(btnTestId)
    expect(basicBtn).toBeInTheDocument()
  })

  test('Should check that it has been clicked', () => {
    const clickeableBtn = {
      ...minimalConfig,
      onClick: jest.fn()
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
      onClick: jest.fn()
    }

    render(<BasicButton {...notClickeableBtn} />)
    const disabledElm = screen.getByTestId(btnTestId)

    fireEvent.click(disabledElm)
    expect(notClickeableBtn.onClick).not.toHaveBeenCalled()
    expect(notClickeableBtn.onClick).toHaveBeenCalledTimes(0)
  })
})
