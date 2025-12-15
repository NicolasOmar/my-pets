// CORE
import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client/react'
// API
import { CREATE_EVENT } from '@graphql/mutations'
import { GET_MY_PETS_NAMES_QUERY } from '@graphql/queries'
// CONTEXT
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import useEventFormik from './form'
// INTERFACES
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { EventFormData } from '@interfaces/forms'
import { EventCreatePayload, EventCreateResponse, PetNamesResponse } from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { EVENT_FORM_LABELS, EVENT_FORM_TEST_IDS } from '@constants/forms'
import { COMMON_LABELS } from '@constants/common'
// FUNCTIONS
import { parseToLuxonDate } from '@functions/parsers'

const EventForm: React.FC = () => {
  const { petId = '' } = useParams()
  const navigate = useNavigate()
  const { data, loading: isLoadingPets } = useQuery<PetNamesResponse>(GET_MY_PETS_NAMES_QUERY, {
    variables: { search: '' },
    fetchPolicy: 'network-only'
  })
  const [createEvent, { loading: isLoadingEventCreate, error: eventErrors }] = useMutation<
    EventCreateResponse,
    EventCreatePayload
  >(CREATE_EVENT)
  const isFormLoading = useMemo(
    () => isLoadingPets || isLoadingEventCreate,
    [isLoadingPets, isLoadingEventCreate]
  )

  const handleSubmitNewEvent = async (formData: EventFormData) => {
    await createEvent({
      variables: {
        payload: {
          ...formData,
          date: parseToLuxonDate(formData.date),
          associatedPets: [formData.pet]
        }
      }
    })

    navigate(APP_ROUTES.PET_LIST)
  }

  const { eventFormik, eventFormInputsConfig } = useEventFormik({
    petId,
    petList: data?.getMyPets || [],
    formIsWorking: isFormLoading,
    handleSubmit: handleSubmitNewEvent
  })

  const eventFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        testId: EVENT_FORM_TEST_IDS.SUBMIT_BTN,
        text: COMMON_LABELS.CONFIRM,
        type: 'submit',
        color: 'success',
        isDisabled: false
        // AFTER REFACTORING EVENTLIST, ADD A FUNCTION TO NAVIGATE TO IT
      },
      {
        testId: EVENT_FORM_TEST_IDS.CANCEL_BTN,
        text: COMMON_LABELS.CANCEL,
        type: 'button',
        color: 'danger',
        isDisabled: false,
        onClick: () => navigate(APP_ROUTES.PET_LIST)
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

          {eventErrors ? (
            <Message
              headerText={EVENT_FORM_LABELS.ERROR_TITLE}
              bodyText={eventErrors.message}
              color="danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default EventForm
