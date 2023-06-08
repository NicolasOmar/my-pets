import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
import ROUTES from '../../../constants/routes.json'
// GRAPHQL
// REDUX
import reducer from '../../../redux/reducers'
// COMPONENTS
import NewUser from '.'
// MOCKS
import { inputs, goToLoginButton } from './config.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[NewUser]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <NewUser />
        </MockedProvider>
      </Provider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })

  test('Should redirect user to sign up page', async () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <NewUser />
        </MockedProvider>
      </Provider>
    )

    const loginBtn = screen.getByText(goToLoginButton.label)
    fireEvent.click(loginBtn)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalledWith(ROUTES.APP_ROUTES.LOGIN)
    })
  })
})
