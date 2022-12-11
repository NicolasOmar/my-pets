import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// REDUX
import reducer from '../../redux/reducers'
// COMPONENTS
import App from './app'

describe.skip('[App]', () => {
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
