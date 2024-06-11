import { Button, ProgressBar, Table, Title } from 'reactive-bulma'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_MY_PET_EVENTS } from '@graphql/queries'
import './index.scss'
import ROUTES from '@constants/routes'

const parseBodyData = _data => Object.values(_data)

const SeeEvents = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [header, setHeader] = useState([])
  const [body, setBody] = useState([])
  const { data } = useQuery(GET_MY_PET_EVENTS, {
    fetchPolicy: 'network-only',
    variables: {
      petId: params.petId
    }
  })

  useEffect(() => {
    if (data?.getMyPetEvents) {
      const [firstEvent, ...otherEvents] = data?.getMyPetEvents
      const parsedHeader = Object.keys(firstEvent)
      const parsedBodyData = [firstEvent, ...otherEvents].map(eventData => parseBodyData(eventData))
      setHeader(parsedHeader)
      setBody(parsedBodyData)
    }
  }, [data])

  return (
    <section className="see-events__container">
      {
        data && header.length > 0 && body.length > 0 ? (
          <>
            <section className="see-events__header">
              <Button text='Go Back' onClick={() => navigate(ROUTES.APP_ROUTES.LIST_MY_PETS)} />
              <Title
                main={{ text: 'My Pet events', type: 'title' }}
              />
            </section>
            {
              data.getMyPetEvents ? (
                <Table
                  head={header.map(item => ({ content: item }))}
                  body={body.map(_body => ({
                    listOfCells: _body.map(_item => ({ content: _item }))
                  }))}
                />
              ) : (
                  <Title main={{ text: 'Sorry, but there are no loaded events', type: 'title', cssClasses: 'see-events__no-data-label' }} />
              )
            }
          </>
        ) : (
          <ProgressBar />
        )
      }
    </section>
  )
}

export default SeeEvents

SeeEvents.propTypes = {}
