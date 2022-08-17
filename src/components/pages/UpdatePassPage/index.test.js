import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// import { APP_ROUTES } from '../../../constants/routes.json'
// GRAPHQL
// COMPONENTS
import UpdatePassPage from '.'
// MOCKS
import { inputs } from './config.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[UpdatePassPage]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UpdatePassPage />
      </MockedProvider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })
})
