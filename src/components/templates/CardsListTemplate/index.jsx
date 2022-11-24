import React from 'react'
import { arrayOf, bool, number, shape } from 'prop-types'
// COMPONENTS
import Card from '../../molecules/Card'
import GridLayout from '../../molecules/GridLayout'
import TitleHeader from '../../atoms/TitleHeader'
import Spinner from '../../atoms/Spinner'
import Icon from '../../atoms/Icon'

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

const CardsListTemplate = ({ isFetching = false, cardsListTitle, cardListData = [] }) => {
  const parseCardsList = () =>
    cardListData.map(
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
    )

  return isFetching ? (
    <Spinner />
  ) : (
    <GridLayout
      {...{
        width: 9,
        centerGrid: true,
        children: cardsListTitle
          ? [<TitleHeader key="cards-title" {...cardsListTitle} />, ...parseCardsList()]
          : parseCardsList()
      }}
    />
  )
}

export default CardsListTemplate

CardsListTemplate.propTypes = {
  isFetching: bool,
  cardsListTitle: shape(TitleHeader.propTypes),
  cardListData: arrayOf(
    shape({
      ...Card.propTypes,
      childWidth: number
    })
  ).isRequired
}
