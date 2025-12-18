// CORE
import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client/react'
// API
import { CREATE_EVENT, UPDATE_EVENT } from '@graphql/mutations'
import { GET_EVENT, GET_MY_PETS_NAMES_QUERY } from '@graphql/queries'
// CONTEXT
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Title } from 'reactive-bulma'
import ErrorMessage from '@templates/ErrorMessage'
// HOOKS
import useEventFormik from './form'
// INTERFACES
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { EventFormData } from '@interfaces/forms'
import {
  EventCreatePayload,
  EventCreateResponse,
  EventUpdatePayload,
  GetEventResponse,
  PetNamesResponse
} from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { EVENT_FORM_LABELS, EVENT_FORM_TEST_IDS } from '@constants/forms'
import { COMMON_LABELS } from '@constants/common'
// FUNCTIONS
import { parseToLuxonDate } from '@functions/parsers'

const EventForm: React.FC = () => {
  const { petId = null, eventId = null } = useParams()
  const navigate = useNavigate()
  const { data: petListData, loading: isLoadingPets } = useQuery<PetNamesResponse>(
    GET_MY_PETS_NAMES_QUERY,
    {
      variables: { search: '' },
      fetchPolicy: 'network-only'
    }
  )
  const { data: eventData, loading: isLoadingEvent } = useQuery<GetEventResponse>(GET_EVENT, {
    variables: { eventId: eventId ?? '' },
    skip: !eventId || isLoadingPets,
    fetchPolicy: 'network-only'
  })
  const [createEvent, { loading: isLoadingEventCreate, error: eventErrors }] = useMutation<
    EventCreateResponse,
    EventCreatePayload
  >(CREATE_EVENT)
  const [updateEvent, { loading: isLoadingEventUpdate, error: eventUpdateErrors }] = useMutation<
    boolean,
    EventUpdatePayload
  >(UPDATE_EVENT)
  const isFormLoading = useMemo(
    () => isLoadingPets || isLoadingEventCreate || isLoadingEventUpdate || isLoadingEvent,
    [isLoadingPets, isLoadingEventCreate, isLoadingEventUpdate, isLoadingEvent]
  )

  const handleSubmitNewEvent = async (formData: EventFormData) => {
    const payload = {
      description: formData.description,
      date: parseToLuxonDate(formData.date),
      associatedPets: [formData.pet]
    }
    const navigationPath = `${APP_ROUTES.EVENT_LIST}/${petId ?? formData.pet}`

    if (eventId) {
      await updateEvent({
        variables: { id: eventId, payload },
        onCompleted: () => navigate(navigationPath)
      })
    } else {
      await createEvent({
        variables: { payload },
        onCompleted: () => navigate(navigationPath)
      })
    }
  }

  const { eventFormik, eventFormInputsConfig } = useEventFormik({
    petId: petId ?? '',
    petList: petListData?.getMyPets ?? [],
    eventData: eventData?.getEvent ?? null,
    formIsWorking: isFormLoading,
    formIsEditing: eventId !== null,
    handleSubmit: handleSubmitNewEvent
  })

  const eventFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        testId: EVENT_FORM_TEST_IDS.SUBMIT_BTN,
        text: eventId ? COMMON_LABELS.CONFIRM : COMMON_LABELS.ADD,
        type: 'submit',
        color: 'success',
        isDisabled: isFormLoading
      },
      {
        testId: EVENT_FORM_TEST_IDS.CANCEL_BTN,
        text: COMMON_LABELS.CANCEL,
        type: 'button',
        color: 'danger',
        onClick: () =>
          navigate(
            petId
              ? `${APP_ROUTES.EVENT_LIST}/${petId ?? eventFormik.values.pet}`
              : APP_ROUTES.PET_LIST
          )
      }
    ]
  }

  return (
    <Column size="8" offset="2">
      <Box>
        <Title main={{ text: EVENT_FORM_LABELS.TITLE, type: 'title' }} />

        <form onSubmit={eventFormik.handleSubmit}>
          <FormField {...eventFormInputsConfig.pet} />
          <FormField {...eventFormInputsConfig.description} />
          <FormField {...eventFormInputsConfig.date} />

          <ButtonGroup {...eventFormButtons} />

          <ErrorMessage
            title={EVENT_FORM_LABELS.ERROR_TITLE}
            message={eventErrors?.message ?? eventUpdateErrors?.message ?? null}
          />
        </form>
      </Box>
    </Column>
  )
}

export default EventForm
