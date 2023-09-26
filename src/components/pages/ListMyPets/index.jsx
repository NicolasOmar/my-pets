import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS_QUERY } from '../../../graphql/queries'
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
  capitalizeWord
} from '../../../functions/parsers'

const { cardsListTitle } = CONFIG
const { APP_ROUTES } = ROUTES

const ListMyPets = () => {
  let navigate = useNavigate()
  const { loading, data } = useQuery(GET_MY_PETS_QUERY, { fetchPolicy: 'network-only' })
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
              eyeColors,
              passedAway
            },
            i
          ) => {
            return {
              key: `pet-card-info-${i}`,
              cardContent: [
                passedAway
                  ? {
                      type: 'icon',
                      content: {
                        isCustom: true,
                        src: 'https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/null/external-dead-halloween-xnimrodx-lineal-xnimrodx-3.png',
                        alt: 'Passed Away',
                        styles: {
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }
                      }
                    }
                  : null,
                {
                  type: 'title',
                  content: {
                    titleText: name,
                    titleSize: 'normal',
                    subText: petType.name,
                    subSize: 'tiny',
                    cssClasses: 'pb-2'
                  }
                },
                { type: 'section', content: `Birthday: ${parseDateString(birthday, '-')}` },
                {
                  type: 'section',
                  content: `Adopted: ${parseBooleanToString(
                    isAdopted,
                    `Yes, ${parseDateString(adoptionDate, '-')}`,
                    'No'
                  )}`
                },
                { type: 'section', content: `Gender: ${capitalizeWord(gender)}` },
                { type: 'section', content: `Hair: ${parseArrayToString(hairColors, 'name')}` },
                {
                  type: 'section',
                  content: `Has Heterochromia: ${parseBooleanToString(
                    hasHeterochromia,
                    'Yes',
                    'No'
                  )}`
                },
                { type: 'section', content: `Eyes: ${parseArrayToString(eyeColors, 'name')}` }
              ].filter(items => items),
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
