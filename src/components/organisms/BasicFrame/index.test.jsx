import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import BasicFrame from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[BasicFrame]', () => {
  const { withHeader, headerTestIds, titleTestIds } = testing
  const testIds = [...headerTestIds, ...titleTestIds]

  test('Should render the component with required props only', () => {
    render(<BasicFrame />)
    headerTestIds.forEach(testId => expect(screen.getByTestId(testId)).toBeInTheDocument())
    titleTestIds.forEach(testId => expect(() => screen.getByTestId(testId)).toThrow())
  })

  test('Should render with the included Header', () => {
    render(<BasicFrame {...withHeader} />)
    testIds.forEach(testId => expect(screen.getByTestId(testId)).toBeInTheDocument())
  })
})
