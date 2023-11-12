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

const renderSectionContent = ({ type = 'section', key, classes = null, content }) => {
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

const CardsListTemplate = ({
  cardListData,
  cardsListTitle = null,
  hasSearch = false,
  searchValue = null,
  isFetching = false,
  centerList = true,
  onSearch = null
}) => {
  const parseCardsList = () =>
    isFetching
      ? [<ProgressBar key={`card-progress-bar`} isInfiniteLoading={true} />]
      : cardListData?.map(
          ({ key, cardHeader, cardImage, cardContent, cardFooter, childWidth = 3 }, cardI) => {
            const cardConfig = {
              cardHeader: renderCardSection(cardHeader, (headerContent, contentIndex) =>
                renderSectionContent({
                  ...headerContent,
                  key: `card-header-section-${cardI}-${contentIndex}`
                })
              ),
              cardImage,
              cardContent: renderCardSection(cardContent, (sectionContent, contentIndex) =>
                renderSectionContent({
                  ...sectionContent,
                  key: `card-content-section-${cardI}-${contentIndex}`
                })
              ),
              cardFooter,
              childWidth
            }

            return <Card key={key} {...cardConfig} />
          }
        ) ?? null

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
      {
        hasSearch ? (
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
              children: [(
                <BasicInput {
                  ...{
                    type: 'text',
                    control: 'search',
                    value: searchValue,
                    placeHolder: 'Search your pet by its name',
                    onInputChange: onSearch
                  }
                } />
              )]
            }}
          />
        ) : null
      }
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
  cardListData: PropTypes.arrayOf(
    PropTypes.shape({
      ...Card.propTypes,
      childWidth: PropTypes.number
    })
  ).isRequired,
  /** `Attribute` Header configuration object to show a `TitleHeader` above the rest of the components that will compose the template */
  cardsListTitle: PropTypes.shape(TitleHeader.propTypes),
  /** `Attribute` Adds a search bar which will make searchs based on what the implementer adds */
  hasSearch: PropTypes.bool,
  /** `Attribute` Used if `hasSearch` is `true`. Sets search display value to what te user is writing */
  searchValue: PropTypes.string,
  /** `Styling` Adds a spinner on the form and disable the screen (to avoid additional user behavior with the cards) */
  isFetching: PropTypes.bool,
  /** `Styling` Will center the list of cards according the screen or a father container */
  centerList: PropTypes.bool,
  /** `Function` Will send the search termns to its father component */
  onSearch: PropTypes.func
}
