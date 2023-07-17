import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// COMPONENTS
import CardsListTemplate from '.'
// MOCKS
import mocks from './index.mocks.json'
import cardMocks from '../../molecules/Card/index.mocks.json'

describe.skip('[CardsListTemplate]', () => {
  const renderCards = number =>
    Array(number)
      .fill(null)
      .map((_, i) => ({
        cardHeader: [{ content: `Test title card ${i}` }],
        cardImage: cardMocks.testBaseImage,
        cardContent: [
          {
            type: 'title',
            content: {
              titleText: `Test card ${i}`
            }
          },

          {
            type: 'icon',
            content: {
              isCustom: true,
              src: 'localhost:4000',
              alt: 'test icon'
            }
          },
          {
            type: 'section',
            content: cardMocks.testCardContent
          },
          {
            type: 'otherContent',
            content: cardMocks.testCardContent
          }
        ],
        cardFooter: cardMocks.testFooterItems
      }))

  const renderCardListCases = (items, otherProps = {}) => {
    const templateConfig = { ...otherProps, cardListData: renderCards(items) }
    const testIds = [
      'test-card-header',
      'test-card-content',
      'test-card-image',
      'test-card-content'
    ]

    render(<CardsListTemplate {...templateConfig} />)

    testIds.forEach(_id => {
      items > 0
        ? expect(screen.getAllByTestId(_id).length).toBe(items)
        : expect(() => screen.getAllByTestId(_id).length).toThrow()
    })
  }

  test('Should render the component with required props only', () => {
    renderCardListCases(3)
    expect(screen.getAllByTestId('test-title').length).toBe(3)
  })

  test('Should render the component with isFetching', () => {
    render(<CardsListTemplate {...{ cardListData: renderCards(5), isFetching: true }} />)
    expect(screen.getByTestId('test-loading-progress-bar')).toBeInTheDocument()
  })

  test('Should render the component with title included', () => {
    renderCardListCases(5, { cardsListTitle: mocks.cardsListTitle })
    expect(screen.getAllByTestId('test-title').length).toBe(6)
  })

  test('Should render the component without any data', () => {
    renderCardListCases(0, { cardsListTitle: mocks.cardsListTitle })
    expect(screen.getAllByTestId('test-title').length).toBe(1)
  })
})
