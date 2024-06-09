import { useQuery } from '@apollo/client'
import { GET_MY_PET_EVENTS } from '../../../graphql/queries'
import { useParams } from 'react-router-dom'
import Table from '../../organisms/Table'
import { useEffect, useState } from 'react'

const parseBodyData = _data => Object.values(_data)

const SeeEvents = () => {
  const params = useParams()
  const [header, setHeader] = useState([])
  const [body, setBody] = useState([])
  const { data } = useQuery(GET_MY_PET_EVENTS, {
    fetchPolicy: 'network-only',
    variables: {
      petId: params.petId
    }
  })

  useEffect(() => {
    if (data?.getMyPetEvents && header.length === 0) {
      const [firstEvent, ...otherEvents] = data?.getMyPetEvents
      const parsedHeader = Object.keys(firstEvent)
      const parsedBodyData = [firstEvent, ...otherEvents].map(eventData => parseBodyData(eventData))

      setHeader(parsedHeader)
      setBody(parsedBodyData)
    }
  }, [data])

  return data ? (
    <Table
      headConfig={{
        type: 'head',
        rowsContent: [header]
      }}
      bodyConfig={{
        type: 'body',
        rowsContent: body
      }}
    />
  ) : null
}

export default SeeEvents

SeeEvents.propTypes = {}
