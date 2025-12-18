// CORE
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useQuery } from '@apollo/client/react'
import { GET_MY_PETS_POPULATION_QUERY } from '@graphql/queries'
// CONTEXT
// COMPONENTS
import { Card, ColumnGroup, Title } from 'reactive-bulma'
// HOOKS
// INTERFACES
import { PetPopulationResponse } from '@interfaces/graphql'
// CONSTANTS
import { HOME_PAGE_LABELS } from '@constants/forms'
import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS
import { getLoggedUser } from '@functions/local-storage'
import { parseSingularPluralStrings } from '@functions/parsers'

const HomePage: React.FC = () => {
  const user = getLoggedUser()
  const navigate = useNavigate()
  const { data: populationData } = useQuery<PetPopulationResponse>(GET_MY_PETS_POPULATION_QUERY)

  const memoizedPetPopulation = useMemo(() => {
    if (populationData) {
      const petQuantityText = parseSingularPluralStrings({
        quantity: populationData.getMyPetsPopulation[0].quantity,
        zeroString: 'no pets yet',
        singularString: 'pet',
        pluralAddition: 's',
        endString: 'registered'
      })

      return (
        <Card
          content={[
            <p>{HOME_PAGE_LABELS.MY_PETS_CARD_TITLE}</p>,
            <a onClick={() => navigate(APP_ROUTES.PET_LIST)}>{petQuantityText}</a>
          ]}
        />
      )
    } else {
      return <></>
    }
  }, [populationData, navigate])
  const memoizedGreeting = useMemo(
    () =>
      user
        ? `${HOME_PAGE_LABELS.USER_GREETING_START}${user.name ?? '-'}${HOME_PAGE_LABELS.USER_GREETING_END}`
        : HOME_PAGE_LABELS.NO_USER_GREETINGS,
    [user]
  )

  return (
    <ColumnGroup
      isMobileLayout
      isHorizontallyCentered
      isVerticallyCentered
      isMultiline
      listOfColumns={[
        {
          size: '11',
          children: (
            <Title
              main={{
                text: memoizedGreeting,
                type: 'title'
              }}
              secondary={{
                text: HOME_PAGE_LABELS.WELCOME_MESSAGE,
                type: 'subtitle'
              }}
            />
          )
        },
        {
          size: '3',
          children: memoizedPetPopulation
        }
      ]}
    />
  )
}

export default HomePage
