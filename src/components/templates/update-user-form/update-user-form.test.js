import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// REDUX
import store from '../../../redux/reducers'
// COMPONENTS
import UpdateUserForm from './update-user-form'
// HELPER FUNCTIONS
import { setLoggedUser } from '../../../functions/local-storage'

describe('[UpdateUserForm]', () => {
  describe('[HAPPY PATH]', () => {
    test(`Renders without props`, () => {
      setLoggedUser({
        name: 'Test',
        lastName: 'Test'
      })
      render(
        <Provider store={createStore(store)}>
          <MockedProvider mocks={[]} addTypename={false}>
            <UpdateUserForm />
          </MockedProvider>
        </Provider>
      )
      const element = screen.getByText('Name')
      expect(element).toBeInTheDocument()
    })
  })
})
