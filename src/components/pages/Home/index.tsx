// import { useState, useEffect } from 'react'
// // GRAPHQL CLIENT
// import { useLazyQuery } from '@apollo/client'
// import { GET_MY_PETS_POPULATION_QUERY } from '@graphql/queries'
// // COMPONENTS
import { ColumnGroup } from 'reactive-bulma'
// import CardsListTemplate from '@templates/CardsListTemplate'
// import TagList from '@molecules/TagList'
// // FUNCTIONS
// import { getLoggedUser } from '@functions/local-storage'
// import { parseSingularPluralStrings } from '@functions/parsers'
// // INTERFACES
// import { QuantityEntity } from '@interfaces/graphql'
// // MOCKS
// import config from './config.json'

// const { cardListTitle, petPopulationWidget } = config

const Home = () => {
  // const user = getLoggedUser()
  // const [cardsListData, setCardsListData] = useState([
  //   {
  //     ...petPopulationWidget,
  //     cardContent: [
  //       petPopulationWidget.cardContent[0],
  //       {
  //         ...petPopulationWidget.cardContent[1],
  //         content: <ProgressBar isLoading={true} />
  //       }
  //     ]
  //   }
  // ])
  // const [getData, { data }] = useLazyQuery<QuantityEntity[]>(GET_MY_PETS_POPULATION_QUERY)

  // useEffect(() => {
  //   const asyncGetData = async () => await getData()
  //   asyncGetData()
  // }, [getData])

  // useEffect(() => {
  //   if (data) {
  //     const [all, ...pets] = data
  //     const petQuantityText = parseSingularPluralStrings({
  //       quantity: all.quantity,
  //       zeroString: 'no pets yet',
  //       singularString: 'pet',
  //       pluralAddition: 's',
  //       startString: 'You have'
  //     })

  //     setCardsListData([
  //       {
  //         ...petPopulationWidget,
  //         cardContent: [
  //           {
  //             ...petPopulationWidget.cardContent[0],
  //             content: {
  //               ...(petPopulationWidget?.cardContent[0]?.content ?? {}),
  //               titleText: petQuantityText
  //             }
  //           },
  //           {
  //             ...petPopulationWidget.cardContent[1],
  //             content: (
  //               <TagList
  //                 {...{
  //                   dataList: pets.map(({ name, quantity }, i) => ({
  //                     text: `${name}s: ${quantity}`,
  //                     color: i % 2 ? 'is-success' : 'is-danger'
  //                   }))
  //                 }}
  //               />
  //             )
  //           }
  //         ]
  //       }
  //     ])
  //   }
  // }, [data])

  // const cardsListTitle = {
  //   ...cardListTitle,
  //   titleText: `HELLO ${user?.name?.toUpperCase()}`
  // }

  return (
    <ColumnGroup
      isMobileLayout
      isHorizontallyCentered
      isVerticallyCentered
      isMultiline
      listOfColumns={[
        {
          size: 'is-3',
          children: 'TEST'
        },
        {
          size: 'is-3',
          children: 'TEST'
        },
        {
          size: 'is-3',
          children: 'TEST'
        },
        {
          size: 'is-3',
          children: 'TEST'
        }
      ]}
    />
  )
}

export default Home
