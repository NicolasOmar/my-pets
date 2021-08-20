import { fireEvent, render, screen } from '@testing-library/react'
import BasicButton from '.'
import { minimalConfig, disabled } from './index.mocks.json'

describe('[BasicButton]', () => {
  let btnTestId = `${minimalConfig.type}-ui-button ${minimalConfig.color}`

  test('Should render the component with required props only', () => {
    render(<BasicButton {...minimalConfig} />)
    const element = screen.getByTestId(btnTestId)
    expect(element).toBeInTheDocument()
  })

  test('Should check that it has been clicked', () => {
    const clickeableBtn = {
      ...minimalConfig,
      onClick: jest.fn()
    }

    render(<BasicButton {...clickeableBtn} />)
    const element = screen.getByTestId(btnTestId)

    fireEvent.click(element)
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
    const element = screen.getByTestId(btnTestId)

    fireEvent.click(element)
    expect(notClickeableBtn.onClick).not.toHaveBeenCalled()
    expect(notClickeableBtn.onClick).toHaveBeenCalledTimes(0)
  })
})
