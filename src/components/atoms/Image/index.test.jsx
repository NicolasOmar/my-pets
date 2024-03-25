import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import Image from '.'
// MOCKS
import { testing } from './index.mocks.json'

const renderImageCase = mockCase => {
  test(`Should render ${mockCase.altText.replace('Test ', '')}`, () => {
    const testId = mockCase.altText.toLowerCase().replace(' ', '-')
    render(<Image {...mockCase} />)
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })
}

describe('[Image]', () =>
  Object.keys(testing).forEach(mockCase => renderImageCase(testing[mockCase])))
