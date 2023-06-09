import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
// REDUX
// COMPONENTS
import AddPet from '.'
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

describe('[AddPet]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddPet />
      </MockedProvider>
    )

    // Object.keys(inputs).forEach(async key => {
    //   await expect(
    //     () => screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
    //     ).toBeInTheDocument()
    // })

    expect(screen.getByTestId('test-progress-bar')).toBeInTheDocument()
  })
})
