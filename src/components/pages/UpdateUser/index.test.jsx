import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
// CONTEXT
import { UserContext } from '../../../context'
// COMPONENTS
import UpdateUser from '.'
// MOCKS
import { inputs } from './config.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

vi.mock('../../../functions/local-storage', () => ({
  getLoggedUser: () => ({ name: 'test', lastName: 'test' })
}))

describe('[UpdateUser]', () => {
  test('Should render the page with its inputs', () => {
    const providerMock = { setUserData: vi.fn() }

    render(
      <UserContext.Provider value={providerMock}>
        <MockedProvider mocks={[]} addTypename={false}>
          <UpdateUser />
        </MockedProvider>
      </UserContext.Provider>
    )

    Object.keys(inputs).forEach(key => {
      const inputElem = screen.getByTestId(`test-${inputs[key].control}-${inputs[key].type}`)
      expect(inputElem).toBeInTheDocument()
    })
  })
})
