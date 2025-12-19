// CORE
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useQuery } from '@apollo/client/react'
import { GET_MY_PETS_QUERY } from '@graphql/queries'
// CONTEXT
// COMPONENTS
import { Card, Column, ColumnGroup, Icon, ProgressBar, Title } from 'reactive-bulma'
// HOOKS
// INTERFACES
import { ColumnSizeType } from 'reactive-bulma/dist/types/styleTypes'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
// import { InputType } from 'reactive-bulma/dist/types/domTypes'
import { PetListResponse } from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { COMMON_LABELS } from '@constants/common'
import { PET_LIST_LABELS, PET_LIST_TEST_IDS } from '@constants/lists'
// FUNCTIONS
import {
  parseBooleanToString,
  parseArrayToString,
  parseStringToLuxonDate
} from '@functions/parsers'
// import { debouncer } from '@functions/methods'

const PetList: React.FC = () => {
  const navigate = useNavigate()
  const { loading, data } = useQuery<PetListResponse>(GET_MY_PETS_QUERY, {
    fetchPolicy: 'network-only'
  })

  // const searchInputCallback = (event: React.ChangeEvent<HTMLInputElement>) =>
  //   refetch({ search: event.target.value })
  // const searchInput = useMemo(() => ({
  //   type: 'text' as InputType,
  //   placeholder: PET_LIST_LABELS.SEARCH_BY,
  //   style: { marginBottom: '1rem' },
  //   onChange: debouncer(searchInputCallback, 500)
  // }), [searchInputCallback])

  const memoizedPetCardList = useMemo(() => {
    return data
      ? data.getMyPets.map((petData, _petDataId) => {
          const parsedBirthday = petData.birthday ? parseStringToLuxonDate(+petData.birthday) : '-'
          const parsedGender = parseBooleanToString(petData.gender, [
            COMMON_LABELS.MASCULINE,
            COMMON_LABELS.FEMENINE
          ])
          const parsedAdoptionDate = petData.isAdopted
            ? petData.adoptionDate
              ? parseStringToLuxonDate(+petData.adoptionDate)
              : '-'
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
          let petCardContent = [
            <p>{petData.name}</p>,
            <p>{petData.petType.name}</p>,
            <p>{`${PET_LIST_LABELS.BIRTHDAY}: ${parsedBirthday}`}</p>,
            <p>{`${PET_LIST_LABELS.ADOPTED}: ${parsedAdoptionDate}`}</p>,
            <p>{`${PET_LIST_LABELS.GENDER}: ${parsedGender}`}</p>,
            <p>{`${PET_LIST_LABELS.HAIR}: ${parsedHairColors}`}</p>,
            <p>{`${PET_LIST_LABELS.HAS_HETEROCHROMIA}: ${parsedHeterochromia}`}</p>,
            <p>{`${PET_LIST_LABELS.EYES}: ${parsedEyeColors}`}</p>
          ]

          if (petData.passedAway) {
            petCardContent = [
              <Icon
                testId={`${PET_LIST_TEST_IDS.PASSED_AWAY_ICON}-${petData.id}`}
                iconLabel="ghost"
              />,
              ...petCardContent
            ]
          }

          return {
            size: 'one-quarter' as ColumnSizeType,
            children: (
              <Card
                key={_petDataId}
                content={petCardContent}
                footerLinks={[
                  {
                    text: COMMON_LABELS.UPDATE,
                    onClick: () => navigate(`${APP_ROUTES.PET_FORM}/${petData.id}`)
                  },
                  {
                    text: PET_LIST_LABELS.ADD_PET_EVENT,
                    onClick: () => navigate(`${APP_ROUTES.EVENT_FORM}/${petData.id}`)
                  },
                  {
                    text: PET_LIST_LABELS.SEE_PET_EVENTS,
                    onClick: () => navigate(`${APP_ROUTES.EVENT_LIST}/${petData.id}`)
                  }
                ]}
              />
            )
          }
        })
      : []
  }, [data, navigate])

  const memorizedLoadingPets = useMemo(() => {
    const titleConfigurationObj = {
      main: { text: PET_LIST_LABELS.TITLE, type: 'title' },
      secondary:
        data?.getMyPets.length === 0
          ? { text: PET_LIST_LABELS.NO_PETS, type: 'subtitle' }
          : undefined
    } as TitleProps

    return (
      <>
        <Title {...titleConfigurationObj} />
        {loading ? (
          <ProgressBar isLoading testId={PET_LIST_TEST_IDS.PROGRESS_BAR} />
        ) : (
          <>
            {/* <Input {...(searchInput as InputProps)} /> */}
            <ColumnGroup listOfColumns={memoizedPetCardList} />
          </>
        )}
      </>
    )
  }, [loading, data, memoizedPetCardList])

  return (
    <Column size="10" offset="1">
      {memorizedLoadingPets}
    </Column>
  )
}

export default PetList
