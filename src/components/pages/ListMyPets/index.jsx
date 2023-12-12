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
import { debouncer } from '../../../functions/methods'

const { cardsListTitle, passedAwayIcon, petTitle, petSearchInput, noPetsText } = CONFIG
const { APP_ROUTES } = ROUTES

const ListMyPets = () => {
  let navigate = useNavigate()
  const { loading, data, refetch } = useQuery(
    GET_MY_PETS_QUERY, {
      fetchPolicy: 'network-only'
    })
  const [petsInfo, setPetsInfo] = useState([])
  const searchInputCallback = (event) => refetch({ search: event.target.value }) 
  const searchInput = {
    ...petSearchInput,
    onInputChange: debouncer(searchInputCallback, 500)
  }
  
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
            const parsedBirthday = parseDateString(birthday, '-')
            const parsedAdoptionDate = parseBooleanToString(
              isAdopted, [`Yes, ${parseDateString(adoptionDate, '-')}`, 'No']
            )
            const parsedHairColors = parseArrayToString(hairColors, 'name')
            const parsedHeterochromia = parseBooleanToString(
              hasHeterochromia, ['Yes', 'No']
            )
            const parsedEyeColors = parseArrayToString(eyeColors, 'name')

            return {
              key: `pet-card-info-${i}`,
              cardContent: [
                passedAway ? passedAwayIcon : null,
                {
                  type: 'title',
                  content: {
                    ...petTitle,
                    titleText: name,
                    subText: petType.name,
                  }
                },
                {
                  type: 'section',
                  content: `Birthday: ${parsedBirthday}`
                },
                {
                  type: 'section',
                  content: `Adopted: ${parsedAdoptionDate}`
                },
                {
                  type: 'section',
                  content: `Gender: ${capitalizeWord(gender)}`
                },
                {
                  type: 'section',
                  content: `Hair: ${parsedHairColors}`
                },
                {
                  type: 'section',
                  content: `Has Heterochromia: ${parsedHeterochromia}`
                },
                {
                  type: 'section',
                  content: `Eyes: ${parsedEyeColors}`
                }
              ].filter(items => items),
              cardFooter: [
                {
                  label: 'Update',
                  onClick: () => navigate(`${APP_ROUTES.UPDATE_PET}/${id}`)
                },
                {
                  label: 'Add Event',
                  onClick: () => navigate(`${APP_ROUTES.ADD_EVENT}/${id}`)
                },
                {
                  label: 'See Events',
                  onClick: () => navigate(`${APP_ROUTES.SEE_EVENTS}/${id}`)
                }
              ],
              childWidth: 3
            }
          }
        ) ?? []
      ),
    [data, navigate]
  )

  return (
    <CardsListTemplate {...{
      cardsListData: petsInfo,
      cardsListTitle,
      searchInput,
      noDataText: noPetsText,
      isFetching: loading,
    }} />)
}

export default ListMyPets
