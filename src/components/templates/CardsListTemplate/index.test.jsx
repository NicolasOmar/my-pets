import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import CardsListTemplate from '.'
// MOCKS
import { testing } from './index.mocks.json'
import cardMocks from '../../molecules/Card/index.mocks.json'

describe('[CardsListTemplate]', () => {
  const cardTestMocks = cardMocks.testing

  const renderCards = number =>
    Array(number)
      .fill(null)
      .map((_, i) => ({
        key: `test-list-card-item-${i}`,
        cardHeader: [{ content: `Test title card ${i}` }],
        cardImage: cardTestMocks.testBaseImage,
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
            content: cardTestMocks.testCardContent
          },
          {
            type: 'otherContent',
            content: cardTestMocks.testCardContent
          }
        ],
        cardFooter: cardTestMocks.testFooterItems
      }))

  const renderCardListCases = (items, otherProps = {}) => {
    const templateConfig = { ...otherProps, cardsListData: renderCards(items) }
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
    render(<CardsListTemplate {...{ cardsListData: renderCards(5), isFetching: true }} />)
    expect(screen.getByTestId('test-loading-progress-bar')).toBeInTheDocument()
  })

  test('Should render the component with title included', () => {
    renderCardListCases(5, { cardsListTitle: testing.cardsListTitle })
    expect(screen.getAllByTestId('test-title').length).toBe(6)
  })

  test('Should render the component without any data', () => {
    renderCardListCases(0, { cardsListTitle: testing.cardsListTitle })
    expect(screen.getAllByTestId('test-title').length).toBe(1)
  })
})
