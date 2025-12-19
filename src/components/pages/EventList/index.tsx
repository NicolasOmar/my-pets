// CORE
import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client/react'
// API
import { GET_MY_PET_EVENTS } from '@graphql/queries'
import { DELETE_EVENT } from '@graphql/mutations'
// CONTEXT
// COMPONENTS
import { Button, Card, Column, ColumnGroup, ProgressBar, Title } from 'reactive-bulma'
// HOOKS
// INTERFACES
import { ColumnSizeType } from 'reactive-bulma/dist/types/styleTypes'
import { EventListResponse } from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { EVENT_LIST_LABELS, EVENT_LIST_TEST_IDS } from '@constants/lists'
import { COMMON_LABELS } from '@constants/common'
// FUNCTIONS
import { parseStringToLuxonDate } from '@functions/parsers'

const EventList: React.FC = () => {
  const { petId = '' } = useParams()
  const navigate = useNavigate()
  const {
    data,
    loading: loadingEvents,
    refetch: requestEventsAgain
  } = useQuery<EventListResponse>(GET_MY_PET_EVENTS, {
    fetchPolicy: 'network-only',
    variables: { petId }
  })
  const [deleteEvent, { loading: deleteLoading }] = useMutation<boolean>(DELETE_EVENT)
  const isLoading = useMemo(() => loadingEvents || deleteLoading, [loadingEvents, deleteLoading])

  const memoizedEventCardList = useMemo(() => {
    return data
      ? data.getMyPetEvents.map((eventData, _eventDataId) => {
          const parsedEventDate = eventData.date ? parseStringToLuxonDate(+eventData.date) : '-'

          return {
            size: 'one-quarter' as ColumnSizeType,
            children: (
              <Card
                key={`event-card-${_eventDataId}`}
                content={[
                  <p>{`${EVENT_LIST_LABELS.DATE}: ${parsedEventDate}`}</p>,
                  <p>{`${EVENT_LIST_LABELS.DESCRIPTION}: ${eventData.description}`}</p>
                ]}
                footerLinks={[
                  {
                    text: COMMON_LABELS.UPDATE,
                    onClick: () => navigate(`${APP_ROUTES.EVENT_FORM}/${petId}/${eventData.id}`)
                  },
                  {
                    text: COMMON_LABELS.DELETE,
                    onClick: () =>
                      deleteEvent({
                        variables: { id: eventData.id },
                        onCompleted: () => requestEventsAgain()
                      })
                  }
                ]}
              />
            )
          }
        })
      : []
  }, [petId, data, deleteEvent, requestEventsAgain, navigate])

  return (
    <Column size="10" offset="1">
      <Button
        testId={EVENT_LIST_TEST_IDS.GO_BACK_BTN}
        text={COMMON_LABELS.GO_BACK}
        onClick={() => navigate(APP_ROUTES.PET_LIST)}
      />
      <Title main={{ text: EVENT_LIST_LABELS.TITLE, type: 'title' }} />
      {isLoading ? (
        <ProgressBar isLoading testId={EVENT_LIST_TEST_IDS.PROGRESS_BAR} />
      ) : (
        <ColumnGroup listOfColumns={memoizedEventCardList} />
      )}
    </Column>
  )
}

export default EventList
