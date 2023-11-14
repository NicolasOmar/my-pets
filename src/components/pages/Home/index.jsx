import React, { useState, useEffect } from 'react'
// GRAPHQL CLIENT
import { useLazyQuery } from '@apollo/client'
import { GET_MY_PETS_POPULATION_QUERY } from '../../../graphql/queries'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
import TagList from '../../molecules/TagList'
import ProgressBar from '../../atoms/ProgressBar'
// FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'
// MOCKS
import config from './config.json'

const { cardListTitle, petPopulationWidget } = config

const Home = () => {
  const user = getLoggedUser()
  const [cardsListData, setCardListData] = useState([
    {
      ...petPopulationWidget,
      cardContent: [
        petPopulationWidget.cardContent[0],
        {
          ...petPopulationWidget.cardContent[1],
          content: <ProgressBar isInfiniteLoading={true} />
        }
      ]
    }
  ])
  const [getData, { data }] = useLazyQuery(GET_MY_PETS_POPULATION_QUERY)

  useEffect(() => {
    const asyncGetData = async () => await getData()
    asyncGetData()
  }, [getData])

  useEffect(() => {
    if (data) {
      const [all, ...pets] = data.getMyPetsPopulation
      setCardListData([
        {
          ...petPopulationWidget,
          cardContent: [
            {
              ...petPopulationWidget.cardContent[0],
              content: {
                ...petPopulationWidget.cardContent[0].content,
                titleText: `${
                  all.quantity === 0
                    ? `You have no pets yet`
                    : `You have ${all.quantity} ${all.quantity === 1 ? 'pet' : 'pets'}`
                }`,
                isCentered: true
              }
            },
            {
              ...petPopulationWidget.cardContent[1],
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
    ...cardListTitle,
    titleText: `HELLO ${user?.name?.toUpperCase()}`
  }

  return <CardsListTemplate {...{ cardsListTitle, cardsListData }} />
}

export default Home
