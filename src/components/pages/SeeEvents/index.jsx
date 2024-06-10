import { useQuery } from '@apollo/client'
import { GET_MY_PET_EVENTS } from '@graphql/queries'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Table } from 'reactive-bulma'

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
    if (data?.getEvents) {
      const [firstEvent, ...otherEvents] = data?.getEvents
      const parsedHeader = Object.keys(firstEvent)
      const parsedBodyData = [firstEvent, ...otherEvents].map(eventData => parseBodyData(eventData))
      setHeader(parsedHeader)
      setBody(parsedBodyData)
    }
  }, [data])

  return data && header.length > 0 && body.length > 0 ? (
    <Table
      head={header.map(item => ({ content: item }))}
      body={body.map(_body => ({
        listOfCells: _body.map(_item => ({ content: _item }))
      }))}
    />
  ) : null
}

export default SeeEvents

SeeEvents.propTypes = {}
