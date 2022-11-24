import React from 'react'
import './index.scss'
import { arrayOf, bool, number, shape } from 'prop-types'
// COMPONENTS
import Card from '../../molecules/Card'
import GridLayout from '../../molecules/GridLayout'
import TitleHeader from '../../atoms/TitleHeader'
import Spinner from '../../atoms/Spinner'

const renderItem = ({ type = 'section', key, classes = null, content }) => {
  switch (type) {
    case 'section':
      return (
        <section key={key} className={classes}>
          {content}
        </section>
      )
    case 'icon':
      return (
        <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img
            src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/null/external-dead-halloween-xnimrodx-lineal-xnimrodx-3.png"
            alt="test"
            height={30}
            width={30}
          />
        </section>
      )
    case 'title':
      return <TitleHeader key={key} {...content} />
    default:
      return content ?? null
  }
}

const CardsListTemplate = ({ isFetching = false, cardsListTitle, cardListData = [] }) => {
  const parseCardsList = () =>
    cardListData.map(
      ({ key, cardHeader, cardImage, cardContent, cardFooter, childWidth = 3 }, cardI) => {
        const cardConfig = {
          cardHeader: cardHeader
            ?.filter(content => content)
            .map((content, contentIndex) =>
              renderItem({
                ...content,
                key: `card-header-section-${cardI}-${contentIndex}`
              })
            ),
          cardImage,
          cardContent: cardContent
            ?.filter(content => content)
            .map((content, contentIndex) =>
              renderItem({
                ...content,
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
