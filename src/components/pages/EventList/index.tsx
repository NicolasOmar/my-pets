// CORE
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// API
import { useQuery } from '@apollo/client'
import { GET_MY_PET_EVENTS } from '@graphql/queries'
// CONTEXT
// COMPONENTS
import { Column, ProgressBar, Title } from 'reactive-bulma'
import { EventListResponse } from '@interfaces/graphql'
// HOOKS
// INTERFACES
// CONSTANTS
// import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS

const EventList: React.FC = () => {
  const params = useParams()
  // const navigate = useNavigate()
  const [body, setBody] = useState<string[] | null>(null)
  const { data, loading } = useQuery<EventListResponse>(GET_MY_PET_EVENTS, {
    fetchPolicy: 'network-only',
    variables: {
      petId: params.petId
    }
  })

  useEffect(() => {
    if (data?.getMyPetEvents && data?.getMyPetEvents.length > 0) {
      setBody(data?.getMyPetEvents.map(({ description }) => description))
    }
  }, [data])

  return (
    // <GridTemplate
    //   title={config.title}
    //   goBackButton={{
    //     text: 'Go Back',
    //     onClick: () => navigate(APP_ROUTES.PET_LIST)
    //   }}
    //   isLoading={loading}
    //   headers={header}
    //   body={body}
    //   noDataTitle={'Sorry, but there are no loaded events'}
    // />
    <Column size="is-12">
      {loading ? (
        <ProgressBar isLoading />
      ) : (
        <>
          <Title main={{ text: 'My Pet Events', type: 'title' }} />
          <>{body}</>
        </>
      )}
    </Column>
  )
}

export default EventList
