import React, { useEffect, useState } from 'react'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS } from '../../../graphql/queries'
// COMPONENTS
import CardsDisplayer from '../../templates/CardsDisplayer'
import { parseBooleanStrings } from '../../../functions/parsers'

const ListMyPets = () => {
  const { loading, data } = useQuery(GET_MY_PETS)
  const [petsInfo, setPetsInfo] = useState([])

  const cardsListTitle = {
    titleText: 'My list of Pets',
    isCentered: true,
    childWidth: 12
  }

  useEffect(
    () =>
      setPetsInfo(
        data?.getMyPets?.map(({ name, petType, isAdopted, hairColors, eyeColors }, i) => ({
          key: `pet-card-info-${i}`,
          cardTitle: {
            titleText: name,
            titleSize: 'normal',
            subText: petType.name,
            subSize: 'tiny'
          },
          cardContent: [
            // birthday && new Date(birthday),
            `Adopted: ${parseBooleanStrings(isAdopted, 'Yes', 'No')}`,
            // adoptionDate,
            `Hair: ${hairColors.map(({ name }) => name).join(', ')}`,
            `Eyes: ${eyeColors.map(({ name }) => name).join(', ')}`
          ],
          cardFooter: [
            { label: 'Update', link: '/' },
            { label: 'Remove', link: '/' }
          ],
          childWidth: 3
        })) || []
      ),
    [data]
  )

  return !loading && <CardsDisplayer {...{ cardsListTitle, cardListData: petsInfo }} />
}

export default ListMyPets
