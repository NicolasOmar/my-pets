import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_MY_PET_EVENTS } from '@graphql/queries'
import GridTemplate from '@components/templates/GridTemplate'
import ROUTES from '@constants/routes'

const parseBodyData = _data => Object.values(_data)

const SeeEvents = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [header, setHeader] = useState(null)
  const [body, setBody] = useState(null)
  const { data, loading } = useQuery(GET_MY_PET_EVENTS, {
    fetchPolicy: 'network-only',
    variables: {
      petId: params.petId
    }
  })

  useEffect(() => {
    if (data?.getMyPetEvents && data?.getMyPetEvents.length > 0) {
      const [firstEvent, ...otherEvents] = data?.getMyPetEvents
      const parsedHeader = Object.keys(firstEvent)
      const parsedBodyData = [firstEvent, ...otherEvents].map(eventData => parseBodyData(eventData))
      setHeader(parsedHeader)
      setBody(parsedBodyData)
    }
  }, [data])

  return (
    <GridTemplate
      title={'My Pet events'}
      goBackButton={{
        text: 'Go Back',
        onClick: () => navigate(ROUTES.APP_ROUTES.LIST_MY_PETS)
      }}
      isLoading={loading}
      headers={header}
      body={body}
      noDataTitle={'Sorry, but there are no loaded events'}
    />
  )
}

export default SeeEvents

SeeEvents.propTypes = {}
