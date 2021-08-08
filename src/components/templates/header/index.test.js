import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// REDUX
import store from '../../../redux/reducers'
// COMPONENTS
import Header from '.'

describe('[Header]', () => {
  describe('[HAPPY PATH]', () => {
    test('Render with a dummy "name" prop', () => {
      render(
        <Provider store={createStore(store)}>
          <MockedProvider mocks={[]} addTypename={false}>
            <Header name={'TEST'} />
          </MockedProvider>
        </Provider>
      )
      const element = screen.getByText('TEST')
      expect(element).toBeInTheDocument()
    })
  })
})
