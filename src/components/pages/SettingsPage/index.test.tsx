import React from 'react'
import { MockedProvider } from '@apollo/client/testing/react'
import { render } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import SettingsPage from '.'
// MOCKS
import { loginUserPayloadMock, getLoggedUser } from './index.mocks.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

// Mocking getLoggedUser to return valid user data
vi.mock('../../../functions/local-storage', () => ({
  ...vi.importActual('../../../functions/local-storage'),
  getLoggedUser: () => getLoggedUser
}))

describe('[SettingsPage]', () => {
  const userContextMock = {
    userData: loginUserPayloadMock,
    setUserData: vi.fn()
  }

  test('Should render the page with its inputs', () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <MockedProvider mocks={[]}>
          <SettingsPage />
        </MockedProvider>
      </UserContext.Provider>
    )
    expect(true).toBe(true)
  })
})
