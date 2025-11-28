// CORE
import { useMemo } from 'react'
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
// FUNCTIONS
import { getLoggedUser } from '@functions/local-storage'
import { parseSingularPluralStrings } from '@functions/parsers'

const Home: React.FC = () => {
  const user = getLoggedUser()
  const { data: populationData } = useQuery<PetPopulationResponse>(GET_MY_PETS_POPULATION_QUERY)

  const memoizedPetPopulation = useMemo(() => {
    if (populationData) {
      const petQuantityText = parseSingularPluralStrings({
        quantity: populationData.getMyPetsPopulation[0].quantity,
        zeroString: 'no pets yet',
        singularString: 'pet',
        pluralAddition: 's',
        startString: 'You have'
      })

      return <Card content={[<p>My Pets</p>, <p>{petQuantityText}</p>]} />
    } else {
      return <></>
    }
  }, [populationData])

  return (
    <ColumnGroup
      isMobileLayout
      isHorizontallyCentered
      isVerticallyCentered
      isMultiline
      listOfColumns={[
        {
          size: 'is-12',
          children: (
            <Title
              main={{
                text: `HELLO ${user?.name?.toUpperCase()}`,
                type: 'title'
              }}
              secondary={{
                text: 'Welcome to our beautiful place',
                type: 'subtitle'
              }}
            />
          )
        },
        {
          size: 'is-3',
          children: memoizedPetPopulation
        }
      ]}
    />
  )
}

export default Home
