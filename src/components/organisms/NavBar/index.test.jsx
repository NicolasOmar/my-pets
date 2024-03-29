import React from 'react'
import { describe, test, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import ProgressBar from '../../atoms/ProgressBar'
import NavBar from '.'
// MOCKS
import { testing } from './index.mocks.json'

const checkExists = sectionId => expect(screen.getByTestId(sectionId)).toBeInTheDocument()

describe('[NavBar]', () => {
  const { startConfig, endConfig } = testing

  test('Should render the component with required props only', () => {
    render(<NavBar />)

    checkExists('navbar-body')
    expect(() => screen.getByTestId('navbar-menu')).toThrow()
  })

  test('Should render the sections', () => {
    render(<NavBar {...startConfig} />)
    checkExists('navbar-start')

    cleanup()

    render(<NavBar {...endConfig} />)
    checkExists('navbar-end')

    cleanup()

    render(<NavBar {...{ ...startConfig, ...endConfig }} />)
    checkExists('navbar-start')
    checkExists('navbar-end')
  })

  test('Should render the brand', () => {
    render(<NavBar icon={<ProgressBar />} />)

    checkExists('navbar-brand')
  })
})
