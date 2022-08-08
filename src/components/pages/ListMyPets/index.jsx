import React, { useEffect, useState } from 'react'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS } from '../../../graphql/queries'
// COMPONENTS
import CardsDisplayer from '../../templates/CardsDisplayer'
import { parseBooleanStrings, parseDateString, parseStringToList } from '../../../functions/parsers'

const ListMyPets = () => {
  const { loading, data } = useQuery(GET_MY_PETS, { fetchPolicy: 'network-only' })
  const [petsInfo, setPetsInfo] = useState([])

  const cardsListTitle = {
    titleText: 'My list of Pets',
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
                `Hair: ${parseStringToList(hairColors, 'name')}`,
                `Eyes: ${parseStringToList(eyeColors, 'name')}`
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

  return !loading && <CardsDisplayer {...{ cardsListTitle, cardListData: petsInfo }} />
}

export default ListMyPets
