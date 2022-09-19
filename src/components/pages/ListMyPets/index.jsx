import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS } from '../../../graphql/queries'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
// PAGE CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import {
  parseBooleanToString,
  parseDateString,
  parseArrayToString,
  normalizeCapitalWord
} from '../../../functions/parsers'

const { cardsListTitle } = CONFIG
const { APP_ROUTES } = ROUTES

const ListMyPets = () => {
  let navigate = useNavigate()
  const { loading, data } = useQuery(GET_MY_PETS, { fetchPolicy: 'network-only' })
  const [petsInfo, setPetsInfo] = useState([])

  useEffect(
    () =>
      setPetsInfo(
        data?.getMyPets?.map(
          (
            {
              id,
              name,
              petType,
              birthday,
              isAdopted,
              adoptionDate,
              gender,
              hairColors,
              hasHeterochromia,
              eyeColors
            },
            i
          ) => {
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
                `Adopted: ${parseBooleanToString(
                  isAdopted,
                  `Yes, ${parseDateString(adoptionDate, '-')}`,
                  'No'
                )}`,
                `Gender: ${normalizeCapitalWord(gender)}`,
                `Hair: ${parseArrayToString(hairColors, 'name')}`,
                `Has Heterochromia: ${parseBooleanToString(hasHeterochromia, 'Yes', 'No')}`,
                `Eyes: ${parseArrayToString(eyeColors, 'name')}`
              ],
              cardFooter: [
                {
                  label: 'Update',
                  onClick: () => navigate(`${APP_ROUTES.UPDATE_PET}/${id}`)
                }
                // { label: 'Remove', onClick: () => navigate(APP_ROUTES.ADD_PET) }
              ],
              childWidth: 3
            }
          }
        ) || []
      ),
    [data, navigate]
  )

  return <CardsListTemplate {...{ isFetching: loading, cardsListTitle, cardListData: petsInfo }} />
}

export default ListMyPets
