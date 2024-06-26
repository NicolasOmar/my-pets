import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import Card from '../../molecules/Card'
import GridLayout from '../../molecules/GridLayout'
import TitleHeader from '../../atoms/TitleHeader'
import Icon from '../../atoms/Icon'
import ProgressBar from '../../atoms/ProgressBar'
import Column from '../../atoms/Column'
import BasicInput from '../../atoms/BasicInput'

const renderCardSectionContent = ({ type = 'section', key, classes = null, content }) => {
  switch (type) {
    case 'section':
      return (
        <section key={key} className={classes}>
          {content}
        </section>
      )
    case 'icon':
      return <Icon key={key} {...content} />
    case 'title':
      return <TitleHeader key={key} {...content} />
    default:
      return content ?? null
  }
}

const renderCardSection = (cardSection, mapFn) =>
  Array.isArray(cardSection)
    ? cardSection
        .filter(cardSection => cardSection)
        .map((_sectionContent, _sectionIndex) => mapFn(_sectionContent, _sectionIndex))
    : cardSection

const renderCardsGroup = cardsListData =>
  cardsListData?.map(
    ({ key, cardHeader, cardImage, cardContent, cardFooter, childWidth = 3 }, cardIndex) => {
      const cardConfig = {
        cardHeader: renderCardSection(cardHeader, (headerContent, headerIndex) =>
          renderCardSectionContent({
            ...headerContent,
            key: `card-header-section-${cardIndex}-${headerIndex}`
          })
        ),
        cardImage,
        cardContent: renderCardSection(cardContent, (sectionContent, contentIndex) =>
          renderCardSectionContent({
            ...sectionContent,
            key: `card-content-section-${cardIndex}-${contentIndex}`
          })
        ),
        cardFooter,
        childWidth
      }

      return <Card key={key} {...cardConfig} />
    }
  ) ?? [null]

const CardsListTemplate = ({
  cardsListData,
  cardsListTitle = null,
  searchInput = null,
  noDataText = {
    testId: 'test-no-data-title',
    titleText: 'No data'
  },
  isFetching = false,
  centerList = true
}) => {
  const searchInputConfig = searchInput
    ? { ...searchInput, value: searchInput.value ?? null }
    : null
  const noDataConfig = {
    ...noDataText,
    childWidth: 12,
    isCentered: true
  }
  const parseCardsList = () =>
    isFetching
      ? [<ProgressBar key={`card-progress-bar`} isInfiniteLoading={true} />]
      : cardsListData.length > 0
        ? renderCardsGroup(cardsListData)
        : [<TitleHeader key={`card-title-header`} {...noDataConfig} />]

  return (
    <>
      {cardsListTitle ? (
        <Column
          {...{
            _key: 'test-card-list-header',
            testId: 'test-card-list-header',
            width: 12,
            children: [<TitleHeader key="cards-title" {...cardsListTitle} />]
          }}
        />
      ) : null}
      {searchInputConfig ? (
        <Column
          {...{
            _key: 'test-card-list-search',
            testId: 'test-card-list-search',
            width: 3,
            isCentered: true,
            style: {
              margin: '0 auto'
            },
            cssClasses: 'pb-4',
            children: [<BasicInput key={`card-basic-input`} {...searchInputConfig} />]
          }}
        />
      ) : null}
      <GridLayout
        {...{
          centerGrid: centerList,
          style: {
            margin: '0 2.5%'
          },
          children: parseCardsList()
        }}
      />
    </>
  )
}

export default CardsListTemplate

CardsListTemplate.propTypes = {
  /**`Attribute` `Required` List of `Card` configuration objects that will be displayed */
  cardsListData: PropTypes.arrayOf(
    PropTypes.shape({
      ...Card.propTypes,
      key: PropTypes.string.isRequired,
      childWidth: PropTypes.number
    })
  ).isRequired,
  /** `Attribute` Header configuration object to show a `TitleHeader` above the rest of the components that will compose the template */
  cardsListTitle: PropTypes.shape(TitleHeader.propTypes),
  /** `Attribute` Sets a `BasicInput` config object to make custom search when the user is writing */
  searchInput: PropTypes.shape(BasicInput.propTypes),
  /** `Attribute` Text configuration object to show a `TitleHeader` that will be shown in case there is no data */
  noDataText: PropTypes.shape(TitleHeader.propTypes),
  /** `Styling` Adds a spinner on the form and disable the screen (to avoid additional user behavior with the cards) */
  isFetching: PropTypes.bool,
  /** `Styling` Will center the list of cards according the screen or a father container */
  centerList: PropTypes.bool
}
