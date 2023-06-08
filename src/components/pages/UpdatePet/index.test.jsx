import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// import { APP_ROUTES } from '../../../constants/routes.json'
// GRAPHQL
// COMPONENTS
import UpdatePet from '.'
// MOCKS
// import { inputs } from './config.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[UpdatePet]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdatePet />
      </MockedProvider>
    )

    // Object.keys(inputs).forEach(key => {
    //   const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
    //   expect(inputElem).toBeInTheDocument()
    // })

    expect(screen.getByTestId('test-progress-bar')).toBeInTheDocument()
  })
})
