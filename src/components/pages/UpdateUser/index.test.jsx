import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// APP_ROUTES
// GRAPHQL
// REDUX
import reducer from '../../../redux/reducers'
// COMPONENTS
import UpdateUser from '.'
// MOCKS
import { inputs } from './config.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

vi.mock('../../../functions/local-storage', () => ({
  getLoggedUser: () => ({ name: 'test', lastName: 'test' })
}))

describe('[UpdateUser]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <UpdateUser />
        </MockedProvider>
      </Provider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })
})
