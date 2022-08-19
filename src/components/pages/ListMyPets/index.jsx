import React, { useEffect, useState } from 'react'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS } from '../../../graphql/queries'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
// FUNCTIONS
import {
  parseBooleanStrings,
  parseDateString,
  parseArrayToString
} from '../../../functions/parsers'

const ListMyPets = () => {
  const { loading, data } = useQuery(GET_MY_PETS, { fetchPolicy: 'network-only' })
  const [petsInfo, setPetsInfo] = useState([])

  const cardsListTitle = {
    titleText: 'My list of Pets',
    titleSize: 'big',
    isCentered: true,
    childWidth: 12,
    styles: {
      paddingTop: '15px'
    }
  }

  useEffect(
    () =>
      setPetsInfo(
        data?.getMyPets?.map(
          ({ name, petType, birthday, isAdopted, adoptionDate, hairColors, eyeColors }, i) => {
            return {
              key: `pet-card-info-${i}`,
              cardTitle: {
                titleText: name,
                titleSize: 'normal',
                subText: petType.name,
                subSize: 'tiny'
              },
              cardContent: [
                `Birthday: ${parseDateString(birthday, '-')}`,
                `Adopted: ${parseBooleanStrings(
                  isAdopted,
                  `Yes, ${parseDateString(adoptionDate, '-')}`,
                  'No'
                )}`,
                `Hair: ${parseArrayToString(hairColors, 'name')}`,
                `Eyes: ${parseArrayToString(eyeColors, 'name')}`
              ],
              cardFooter: [
                { label: 'Update', link: '/' },
                { label: 'Remove', link: '/' }
              ],
              childWidth: 3
            }
          }
        ) || []
      ),
    [data]
  )

  return <CardsListTemplate {...{ isFetching: loading, cardsListTitle, cardListData: petsInfo }} />
}

export default ListMyPets
