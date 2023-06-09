import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// REDUX
import reducer from '../../redux/reducers'
// COMPONENTS
import App from './app'

describe('[App]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders without props', () => {
      render(
        <Provider store={configureStore({ reducer })}>
          <MockedProvider mocks={[]} addTypefile={false}>
            <App />
          </MockedProvider>
        </Provider>
      )
      const element = screen.getByText(/Welcome to My Pets/i)
      expect(element).toBeInTheDocument()
    })
  })
})
