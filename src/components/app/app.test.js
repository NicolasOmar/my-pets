import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// REDUX
import store from '../../redux/reducers'
// COMPONENTS
import App from './app'

describe.skip('[App]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders without props', () => {
      render(
        <Provider store={createStore(store)}>
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
