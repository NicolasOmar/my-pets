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
      .map((_, i) => ({
        cardTitle: { titleText: `Test card ${i}` },
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

  test('Should render the component with required props only', () => {
    renderCardListCases(3)
    expect(screen.getAllByTestId('test-title').length).toBe(3)
  })

  test('Should render the component with isFetching', () => {
    render(<CardsListTemplate {...{ cardListData: renderCards(5), isFetching: true }} />)
    expect(screen.getByTestId('test-spinner')).toBeInTheDocument()
  })

  test('Should render the component with title included', () => {
    renderCardListCases(5, { cardsListTitle: mocks.cardsListTitle })
    expect(screen.getAllByTestId('test-title').length).toBe(6)
  })
})
