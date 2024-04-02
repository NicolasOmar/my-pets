import { describe, test, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import Icon from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Icon]', () => {
  const { ghostSrc, baseTestId } = testing

  test('Should render the component with required props only', () => {
    render(<Icon />)
    const minimalIcon = screen.getByTestId(baseTestId)
    expect(minimalIcon).toBeInTheDocument()
  })

  test('Should render the component with a custom src', () => {
    render(<Icon {...ghostSrc} />)
    const iconWithImageSrc = screen.getByTestId(`${baseTestId}-img`)
    expect(iconWithImageSrc).toBeInTheDocument()
    expect(iconWithImageSrc.src).toEqual(ghostSrc.src)
  })
})
