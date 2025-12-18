import React from 'react'
import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import AppWrapper from './index'

describe('[AppWrapper]', () => {
  test('renders without crashing', () => {
    render(<AppWrapper />)
    expect(true).toBe(true)
  })
})
