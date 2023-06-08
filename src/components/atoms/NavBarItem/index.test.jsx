import React from 'react'
import { describe, test, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
// COMPONENTS
import NavBarItem from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[NavBarItem]', () => {
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
