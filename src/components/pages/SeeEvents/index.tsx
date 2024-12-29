import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_MY_PET_EVENTS } from '@graphql/queries'
import GridTemplate from '@components/templates/GridTemplate'
import ROUTES from '@constants/routes'
import config from './config.json'

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
      title={config.title}
      goBackButton={{
        text: config.goBackButton,
        onClick: () => navigate(ROUTES.APP_ROUTES.PET_LIST)
      }}
      isLoading={loading}
      headers={header}
      body={body}
      noDataTitle={config.noDataTitle}
    />
  )
}

export default SeeEvents

SeeEvents.propTypes = {}
