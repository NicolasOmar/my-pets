import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// import { APP_ROUTES } from '../../../constants/routes.json'
// GRAPHQL
// COMPONENTS
import UpdatePass from '.'
// MOCKS
import { inputs } from './config.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[UpdatePass]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdatePass />
      </MockedProvider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })
})
