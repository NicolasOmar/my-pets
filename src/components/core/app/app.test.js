import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// REDUX
import store from '../../../reducers'
// COMPONENTS
import App from './app'

describe('[App]', () => {
  test('renders App component without props', () => {
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
