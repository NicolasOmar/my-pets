import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
// APP_ROUTES
// GRAPHQL
// REDUX
import reducer from '../../../redux/reducers'
// COMPONENTS
import ListMyPets from '.'
// MOCKS

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[ListMyPets]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <ListMyPets />
        </MockedProvider>
      </Provider>
    )

    expect(() => screen.getByText('My list of Pets')).toThrow()
    expect(screen.getByTestId('test-spinner')).toBeInTheDocument()
  })
})
