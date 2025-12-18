import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import ErrorMessage from './index'

describe('ErrorMessage Component', () => {
  test('should render nothing when message is null', () => {
    render(<ErrorMessage title="Error" message={null} />)
    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })

  test('should render the error message when message is provided', () => {
    render(<ErrorMessage title="Error" message="Something went wrong" />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  test('should apply the danger color to the message', () => {
    render(<ErrorMessage title="Error" message="Something went wrong" />)
    const messageElement = screen.getByTestId('test-message-danger')
    expect(messageElement).toHaveClass('is-danger')
  })
})
