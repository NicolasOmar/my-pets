// MOCKS
import { render, screen } from '@testing-library/react'
import CardsListTemplate from '.'
// MOCKS
import mocks from './index.mocks.json'
import cardMocks from '../../molecules/Card/index.mocks.json'

describe('[CardListTemplate]', () => {
  const renderCards = number =>
    Array(number)
      .fill(null)
      .map(() => ({
        cardImage: cardMocks.testBaseImage,
        cardContent: [cardMocks.testCardContent],
        cardFooter: cardMocks.testFooterItems
      }))

  const renderCardListCases = (items, otherProps = {}) => {
    const templateConfig = { ...otherProps, cardListData: renderCards(items) }
    render(<CardsListTemplate {...templateConfig} />)
    expect(screen.getAllByTestId('test-card-content').length).toBe(items)
    expect(screen.getAllByTestId('test-card-image').length).toBe(items)
    expect(screen.getAllByTestId('test-card-content').length).toBe(items)
  }

  test('Should render the component with required props only', () => renderCardListCases(3))

  test('Should render the component with isFetching', () => {
    render(<CardsListTemplate {...{ cardListData: renderCards(5), isFetching: true }} />)
    expect(screen.getByTestId('test-spinner')).toBeInTheDocument()
  })

  test('Should render the component with title included', () => {
    renderCardListCases(1, { cardsListTitle: mocks.cardsListTitle })
    expect(screen.getByTestId('test-title')).toBeInTheDocument()
  })
})
