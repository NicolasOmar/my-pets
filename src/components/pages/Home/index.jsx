import React, { useState, useEffect } from 'react'
// GRAPHQL CLIENT
import { useLazyQuery } from '@apollo/client'
import { GET_MY_PETS_QUANTITY } from '../../../graphql/queries'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
import TagList from '../../molecules/TagList'
// FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const Home = () => {
  const [user] = useState(getLoggedUser())
  const [getData, { data, loading: isFetching }] = useLazyQuery(GET_MY_PETS_QUANTITY)
  const [cardListData, setCardListData] = useState([])

  useEffect(() => {
    const asyncGetData = async () => await getData()
    asyncGetData()
  }, [getData])

  useEffect(() => {
    if (data) {
      const [all, ...pets] = data.getMyPetsQuantity
      setCardListData([
        {
          key: `widget-item`,
          cardContent: [
            {
              type: 'title',
              content: {
                titleText: `Pets: ${all.quantity}`,
                titleSize: 'normal',
                styles: { marginBottom: '20px' }
              }
            },
            {
              type: 'section',
              content: (
                <TagList
                  {...{
                    dataList: pets.map(({ name, quantity }, i) => ({
                      text: `${name}s: ${quantity}`,
                      color: i % 2 ? 'success' : 'danger'
                    }))
                  }}
                />
              )
            }
          ]
        }
      ])
    }
  }, [data])

  const cardsListTitle = {
    titleText: `HELLO ${user?.name?.toUpperCase()}`,
    titleSize: 'bigger',
    subText: 'Welcome to our beautiful place',
    subSize: 'small',
    isCentered: true,
    childWidth: 12,
    styles: { margin: '20px 0px' }
  }

  return <CardsListTemplate {...{ isFetching, cardsListTitle, cardListData }} />
}

export default Home
