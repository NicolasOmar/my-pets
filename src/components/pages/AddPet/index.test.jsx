import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
// REDUX
// COMPONENTS
import AddPet from '.'
// MOCKS
import { inputs } from './config.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

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
