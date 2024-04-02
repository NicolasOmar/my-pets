import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import Notification from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Notification]', () => {
  const { minimalConfig } = testing

  test('Should render the component with required props only', () => {
    render(<Notification {...minimalConfig} />)

    const testNotification = screen.getByTestId('test-notification-is-white')
    expect(testNotification).toBeInTheDocument()
  })

  test('Should check the notification has been clicked', () => {
    const clickeableConfig = {
      ...minimalConfig,
      onDeleteClick: vi.fn()
    }
    render(<Notification {...clickeableConfig} />)

    const testNotification = screen.getByTestId('test-notification-is-white-delete')
    fireEvent.click(testNotification)
    expect(clickeableConfig.onDeleteClick).toHaveBeenCalledOnce()
  })
})
