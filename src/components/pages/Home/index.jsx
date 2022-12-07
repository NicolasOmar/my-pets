import React, { useState } from 'react'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
import TagList from '../../molecules/TagList'
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

  const cardListData = [
    {
      key: `widget-item`,
      cardContent: [
        {
          type: 'title',
          content: {
            titleText: 'First widget test',
            titleSize: 'normal',
            styles: { marginBottom: '20px' }
          }
        },
        {
          type: 'section',
          content: (
            <TagList
              {...{
                dataList: Array(13)
                  .fill(null)
                  .map((_, i) => ({
                    text: `widget-test-${++i}`,
                    color: i % 2 ? 'success' : 'danger'
                  }))
              }}
            />
          )
        }
      ]
    }
  ]

  return <CardsListTemplate {...{ isFetching: false, cardsListTitle, cardListData }} />
}

export default Home
