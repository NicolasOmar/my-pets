import React from 'react'
import './index.scss'
import { arrayOf, number, shape } from 'prop-types'
// COMPONENTS
import Card from '../../molecules/Card'
import GridLayout from '../../molecules/GridLayout'
import TitleHeader from '../../atoms/TitleHeader'

const CardsListTemplate = ({ cardsListTitle, cardListData = [] }) => {
  const parseCardsList = () =>
    cardListData.map(
      ({ key, cardImage, cardTitle, cardContent, cardFooter, childWidth = 3 }, cardI) => {
        const cardConfig = {
          cardImage,
          cardContent: (
            <>
              {cardTitle && <TitleHeader key={`card-title-${cardI}`} {...cardTitle} />}
              {cardContent.map(
                (_content, contI) =>
                  _content && (
                    <section
                      key={`card-content-section-${cardI}${contI}`}
                      className={cardTitle && !contI ? 'card-body' : ''}
                    >
                      {_content}
                    </section>
                  )
              )}
            </>
          ),
          cardFooter,
          childWidth
        }

        return <Card key={key} {...cardConfig} />
      }
    )

  return (
    <GridLayout
      {...{
        width: 12,
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
  cardsListTitle: shape(TitleHeader.propTypes),
  cardListData: arrayOf(
    shape({
      cardTitle: shape(TitleHeader.propTypes),
      ...Card.propTypes,
      childWidth: number
    })
  ).isRequired
}
