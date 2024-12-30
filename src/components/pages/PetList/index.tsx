// CORE
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useQuery } from '@apollo/client'
import { GET_MY_PETS_QUERY } from '@graphql/queries'
// CONTEXT
// COMPONENTS
import { Card, Column, ColumnGroup, Icon, Input, ProgressBar, Title } from 'reactive-bulma'
// HOOKS
// INTERFACES
import { InputProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { InputType } from 'reactive-bulma/dist/types/domTypes'
import { PetListResponse } from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { COMMON_LABELS } from '@constants/common'
import { PET_LIST_LABELS } from '@constants/lists'
// FUNCTIONS
import {
  parseBooleanToString,
  parseArrayToString,
  parseStringToLuxonDate
} from '@functions/parsers'
import { debouncer } from '@functions/methods'

const PetList: React.FC = () => {
  let navigate = useNavigate()
  const { loading, data, refetch } = useQuery<PetListResponse>(GET_MY_PETS_QUERY, {
    fetchPolicy: 'network-only'
  })

  const searchInputCallback = (event: React.ChangeEvent<HTMLInputElement>) =>
    refetch({ search: event.target.value })
  const searchInput = {
    type: 'text' as InputType,
    placeholder: PET_LIST_LABELS.SEARCH_BY,
    style: { marginBottom: '1rem' },
    onChange: debouncer(searchInputCallback, 500)
  }

  const memoizedPetCardList = useMemo(() => {
    return data
      ? data.getMyPets.map((petData, _petDataId) => {
          const parsedBirthday = petData.birthday ? parseStringToLuxonDate(+petData.birthday) : '-'
          const parsedGender = parseBooleanToString(petData.gender, [
            COMMON_LABELS.MASCULILNE,
            COMMON_LABELS.FEMENINE
          ])
          const parsedAdoptionDate = petData.adoptionDate
            ? parseStringToLuxonDate(+petData.adoptionDate)
            : '-'
          const parsedHairColors = parseArrayToString({
            rawList: petData.hairColors,
            prop: 'name'
          })
          const parsedHeterochromia = parseBooleanToString(petData.hasHeterochromia)
          const parsedEyeColors = parseArrayToString({
            rawList: petData.eyeColors,
            prop: 'name'
          })

          return {
            children: (
              <Card
                content={[
                  <>{petData.passedAway ? <Icon iconLabel="ghost" /> : null}</>,
                  <p>{petData.name}</p>,
                  <p>{petData.petType.name}</p>,
                  <p>{`${PET_LIST_LABELS.BIRTHDAY}: ${parsedBirthday}`}</p>,
                  <p>{`${PET_LIST_LABELS.ADOPTED}: ${parsedAdoptionDate}`}</p>,
                  <p>{`${PET_LIST_LABELS.GENDER}: ${parsedGender}`}</p>,
                  <p>{`${PET_LIST_LABELS.HAIR}: ${parsedHairColors}`}</p>,
                  <p>{`${PET_LIST_LABELS.HAS_HETEROCHROMIA}: ${parsedHeterochromia}`}</p>,
                  <p>{`${PET_LIST_LABELS.EYES}: ${parsedEyeColors}`}</p>
                ]}
                footerLinks={[
                  {
                    text: 'Update',
                    onClick: () => navigate(`${APP_ROUTES.PET_FORM}/${petData.id}`)
                  },
                  {
                    text: 'Add Event',
                    onClick: () => navigate(`${APP_ROUTES.EVENT_FORM}/${petData.id}`)
                  },
                  {
                    text: 'See Events',
                    onClick: () => navigate(`${APP_ROUTES.EVENT_LIST}/${petData.id}`)
                  }
                ]}
              />
            )
          }
        })
      : []
  }, [data])

  return (
    <Column size="is-12">
      {loading ? (
        <ProgressBar isLoading />
      ) : data ? (
        <>
          <Title main={{ text: PET_LIST_LABELS.TITLE, type: 'title' }} />
          <Input {...(searchInput as InputProps)} />
          <ColumnGroup listOfColumns={memoizedPetCardList} />
        </>
      ) : (
        <Title main={{ text: PET_LIST_LABELS.NO_PETS, type: 'title' }} />
      )}
    </Column>
  )
}

export default PetList
