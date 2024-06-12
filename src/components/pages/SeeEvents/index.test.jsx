import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
// COMPONENTS
import SeeEvents from '.'
// MOCKS
import { testing } from './mocks.json'

const mockUseNavigate = vi.fn()

vi.mock('react-router-dom', async originalPackage => {
  const _originalPackage = await originalPackage
  return {
    ..._originalPackage,
    useParams: () => mockUseNavigate,
    useNavigate: () => mockUseNavigate
  }
})

describe('[SeeEvents]', () => {
  const { pageTitle } = testing

  test('Should render the page with the loading component', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SeeEvents />
      </MockedProvider>
    )

    waitFor(() => {
      expect(screen.getByText(pageTitle)).toBeInTheDocument()
    })
  })
})
