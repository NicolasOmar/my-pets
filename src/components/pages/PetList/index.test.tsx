import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
// GRAPHQL
import { MockedProvider } from '@apollo/client/testing/react'
import { GET_MY_PETS_QUERY } from '../../../graphql/queries'
// COMPONENTS
import PetList from '.'
// CONSTANTS
import { PET_LIST_LABELS, PET_LIST_TEST_IDS } from '../../../constants/lists'
import { COMMON_LABELS } from '../../../constants/common'
import { APP_ROUTES } from '../../../constants/routes'
// MOCKS
import {
  getMyFirstPetResponseMock,
  getMySecondPetResponseMock,
  firstPetCardMock,
  secondPetCardMock
} from './mocks.json'

const baseRequest = {
  query: GET_MY_PETS_QUERY
}
const loadingMock = [
  {
    request: {
      ...baseRequest,
      variables: {}
    },
    result: { data: { getMyPets: [] } }
  }
]
const getOnePetMock = [
  {
    request: baseRequest,
    result: getMyFirstPetResponseMock
  }
]
const getOtherPetMock = [
  {
    request: baseRequest,
    result: getMySecondPetResponseMock
  }
]
const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useNavigate: () => mockUseNavigate
  }
})

describe('[PetList]', () => {
  test('Should render the page with the loading component', async () => {
    render(
      <MockedProvider mocks={loadingMock}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId(PET_LIST_TEST_IDS.PROGRESS_BAR)).toBeInTheDocument()
    })
  })

  test('Should render the page with the first loaded pet card, then click its options and navigate accordingly', async () => {
    const firstPetId = getMyFirstPetResponseMock.data.getMyPets[0].id
    const petOptions = [
      {
        link: COMMON_LABELS.UPDATE,
        route: `${APP_ROUTES.PET_FORM}/${firstPetId}`
      },
      {
        link: PET_LIST_LABELS.ADD_PET_EVENT,
        route: `${APP_ROUTES.EVENT_FORM}/${firstPetId}`
      },
      {
        link: PET_LIST_LABELS.SEE_PET_EVENTS,
        route: `${APP_ROUTES.EVENT_LIST}/${firstPetId}`
      }
    ]

    render(
      <MockedProvider mocks={getOnePetMock}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      firstPetCardMock.forEach(mockValue => expect(screen.getByText(mockValue)).toBeInTheDocument())
    })

    petOptions.forEach(async ({ link, route }) => {
      const navigationLink = screen.getByText(link)
      expect(navigationLink).toBeInTheDocument()

      fireEvent.click(navigationLink)

      await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalled()
        expect(mockUseNavigate).toHaveBeenCalledWith(route)
      })
    })
  })
  test('Should render the page with the second loaded pet card and its passed away icon', async () => {
    const secondPetId = getMySecondPetResponseMock.data.getMyPets[0].id

    render(
      <MockedProvider mocks={getOtherPetMock}>
        <PetList />
      </MockedProvider>
    )

    await waitFor(() => {
      secondPetCardMock.forEach(mockValue =>
        expect(screen.getByText(mockValue)).toBeInTheDocument()
      )

      expect(
        screen.getByTestId(`${PET_LIST_TEST_IDS.PASSED_AWAY_ICON}-${secondPetId}`)
      ).toBeInTheDocument()
    })
  })
})
