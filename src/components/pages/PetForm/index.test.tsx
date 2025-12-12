import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import '@testing-library/jest-dom'
// APP_ROUTES
// GRAPHQL
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

describe.skip('[PetForm]', () => {
  test('Should render the page with its inputs', () => {
    render(
      <MockedProvider mocks={[]}>
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
