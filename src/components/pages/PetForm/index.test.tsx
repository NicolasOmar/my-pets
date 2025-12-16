import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
import { GET_PET_TYPES_QUERY, GET_COLORS_QUERY } from '../../../graphql/queries'
// CONTEXT
// COMPONENTS
import PetForm from '.'
import { PET_FORM_TEST_IDS } from '../../../constants/forms'
// MOCKS

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate,
    useParams: () => ({ petId: null })
  }
})

describe('[PetForm]', () => {
  const apolloMocks = [
    {
      request: { query: GET_PET_TYPES_QUERY, variables: {} },
      result: { data: { getPetTypes: [] } }
    },
    {
      request: { query: GET_COLORS_QUERY, variables: { petId: null } },
      result: { data: { getColors: [] } }
    }
  ]
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={apolloMocks}>
        <PetForm />
      </MockedProvider>
    )

    Object.values(PET_FORM_TEST_IDS).forEach(_testId => {
      if (_testId !== PET_FORM_TEST_IDS.PASSED_AWAY) {
        const inputElem = screen.getByTestId(_testId)
        expect(inputElem).toBeInTheDocument()
      }
    })
  })
})
