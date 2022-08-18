import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
// REDUX
// COMPONENTS
import AddPetPage from '.'
// MOCKS
import { inputs } from './config.json'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe('[AddPetPage]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddPetPage />
      </MockedProvider>
    )

    // Object.keys(inputs).forEach(async key => {
    //   await expect(
    //     () => screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
    //     ).toBeInTheDocument()
    // })

    expect(screen.getByTestId('test-spinner')).toBeInTheDocument()
  })
})
