import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS_QUERY } from '@graphql/queries'
// COMPONENTS
// PAGE CONFIG
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS
import {
  parseBooleanToString,
  parseDateString,
  parseArrayToString,
  capitalizeWord,
  parseStringToLuxonDate
} from '@functions/parsers'
import { debouncer } from '@functions/methods'
import { MyPetsResponse } from '@interfaces/graphql'
import { Card, Column, ColumnGroup, Icon, Input, ProgressBar, Title } from 'reactive-bulma'
import { InputType } from 'reactive-bulma/dist/types/domTypes'

const PetList = () => {
  let navigate = useNavigate()

  const cardsListTitle = 'My list of Pets'
  const noPetsText = 'Sorry, there are no pets with the name/s you are searching for'

  const { loading, data, refetch } = useQuery<MyPetsResponse>(GET_MY_PETS_QUERY, {
    fetchPolicy: 'network-only'
  })
  const searchInputCallback = (event: React.ChangeEvent<HTMLInputElement>) =>
    refetch({ search: event.target.value })
  const searchInput = {
    type: 'text' as InputType,
    placeholder: 'Search your pet by its name',
    style: { marginBottom: '1rem' },
    onChange: debouncer(searchInputCallback, 500)
  }

  const memoizedPetCardList = useMemo(() => {
    return data
      ? data.getMyPets.map((petData, _petDataId) => {
          const parsedRawList = parseArrayToString({
            rawList: petData.hairColors,
            prop: 'name'
          })
          const parsedEyeColors = parseArrayToString({
            rawList: petData.eyeColors,
            prop: 'name'
          })
          const parsedBirthday = petData.birthday ? parseStringToLuxonDate(+petData.birthday) : '-'
          const parsedAdoptionDate = petData.adoptionDate
            ? parseStringToLuxonDate(+petData.adoptionDate)
            : '-'
          const parsedHeterochromia = parseBooleanToString(petData.hasHeterochromia)

          return {
            children: (
              <Card
                content={[
                  <>{petData.passedAway ? <Icon iconLabel="ghost" /> : null}</>,
                  <p>{petData.name}</p>,
                  <p>{petData.petType.name}</p>,
                  <p>{`Birthday: ${parsedBirthday}`}</p>,
                  <p>{`Adopted: ${parsedAdoptionDate}`}</p>,
                  <p>{`Gender: ${petData.gender}`}</p>,
                  <p>{`Hair: ${parsedRawList}`}</p>,
                  <p>{`Has Heterochromia: ${parsedHeterochromia}`}</p>,
                  <p>{`Eyes: ${parsedEyeColors}`}</p>
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
          <Title main={{ text: cardsListTitle, type: 'title' }} />
          <Input {...searchInput} />
          <ColumnGroup listOfColumns={memoizedPetCardList} />
        </>
      ) : (
        <Title main={{ text: noPetsText, type: 'title' }} />
      )}
    </Column>
  )
}

export default PetList
