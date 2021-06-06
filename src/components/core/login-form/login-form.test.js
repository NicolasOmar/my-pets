import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// REDUX
import store from '../../../reducers'
// COMPONENTS
import LoginForm from './login-form'

describe('[LoginForm]', () => {
  test('Renders a "Login" Form without props', () => {
    render(
      <Provider store={createStore(store)}>
        <MockedProvider mocks={[]} addTypename={false}>
          <LoginForm />
        </MockedProvider>
      </Provider>
    )
    const element = screen.getByText('Password')
    expect(element).toBeInTheDocument()
  })
})
