import React, { useState } from 'react'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const Home = () => {
  const [user] = useState(getLoggedUser())

  const cardsListTitle = {
    titleText: `HELLO ${user?.name?.toUpperCase()}`,
    titleSize: 'bigger',
    subText: 'Welcome to our beautiful place',
    subSize: 'small',
    isCentered: true,
    childWidth: 12,
    styles: { margin: '20px 0px' }
  }

  const cardListData = Array(5)
    .fill(null)
    .map((_, i) => ({
      key: `widget-item-${i}`,
      cardContent: [
        {
          type: 'section',
          content: `widget-test-${i}`
        }
      ]
    }))

  return <CardsListTemplate {...{ isFetching: false, cardsListTitle, cardListData }} />
}

export default Home
