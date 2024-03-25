import React from 'react'
import { describe, test, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import NavBarItem from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[NavBarItem]', () => {
  const { minimalConfig } = testing
  test('Should render the component with required props only', () => {
    render(<NavBarItem />)
    expect(screen.getByTestId('test-navbar-item')).toBeInTheDocument()

    cleanup()
    render(<NavBarItem {...minimalConfig} />)
    expect(screen.getByTestId('test-navbar-item')).toBeInTheDocument()

    cleanup()
    render(<NavBarItem {...{ isLink: true }} />)
    expect(screen.getByTestId('test-navbar-link')).toBeInTheDocument()
  })
})
