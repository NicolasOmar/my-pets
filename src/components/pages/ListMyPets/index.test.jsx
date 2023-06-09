import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// APP_ROUTES
// GRAPHQL
// REDUX
import reducer from '../../../redux/reducers'
// COMPONENTS
import ListMyPets from '.'
// MOCKS

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[ListMyPets]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <Provider store={configureStore({ reducer })}>
        <MockedProvider mocks={[]} addTypename={false}>
          <ListMyPets />
        </MockedProvider>
      </Provider>
    )

    expect(screen.getByText('My list of Pets')).toBeInTheDocument()
    expect(screen.getByTestId('test-loading-progress-bar')).toBeInTheDocument()
  })
})
