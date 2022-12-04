import React from 'react'
import { arrayOf, bool, number, shape } from 'prop-types'
// COMPONENTS
import Card from '../../molecules/Card'
import GridLayout from '../../molecules/GridLayout'
import TitleHeader from '../../atoms/TitleHeader'
import Icon from '../../atoms/Icon'
import ProgressBar from '../../atoms/ProgressBar'

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
  isFetching = false,
  templateWidth = 9,
  cardsListTitle,
  cardListData = []
}) => {
  const parseCardsList = () =>
    isFetching
      ? [<ProgressBar key={`card-progress-bar`} isLoading={true} />]
      : cardListData.map(
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

  const children = [
    cardsListTitle ? <TitleHeader key="cards-title" {...cardsListTitle} /> : null,
    ...parseCardsList()
  ]

  return (
    <GridLayout
      {...{
        width: templateWidth,
        centerGrid: true,
        children
      }}
    />
  )
}

export default CardsListTemplate

CardsListTemplate.propTypes = {
  isFetching: bool,
  templateWidth: number,
  cardsListTitle: shape(TitleHeader.propTypes),
  cardListData: arrayOf(
    shape({
      ...Card.propTypes,
      childWidth: number
    })
  ).isRequired
}
