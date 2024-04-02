import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import ButtonGroup from '.'
// MOCKS
import { testing } from './index.mocks.json'

const { minimalConfig } = testing

const testButtons = mockConfig => {
  render(<ButtonGroup {...mockConfig} />)
  mockConfig.buttons.forEach(({ label, onClick }) => {
    const btnGroup = screen.getByText(label)
    expect(btnGroup).toBeInTheDocument()

    if (onClick) {
      fireEvent.click(btnGroup)
      expect(onClick).toHaveBeenCalled()
      expect(onClick).toHaveBeenCalledTimes(1)
    }
  })
}

const remockButtons = (prop, values, buttonArray = minimalConfig.buttons) => ({
  buttons: buttonArray.map((button, i) => ({
    ...button,
    [prop]: values[i]
  }))
})

describe('[ButtonGroup]', () => {
  test('Should render the component with required props only', () => testButtons(minimalConfig))

  test('Should render the buttons with other names', () =>
    testButtons(remockButtons('label', ['First tested', 'Second tested'])))

  test('Should check both buttons have been clicked', () =>
    testButtons(remockButtons('onClick', [vi.fn(), vi.fn()])))
})
