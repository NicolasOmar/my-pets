import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { CREATE_EVENT } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from "../../templates/FormTemplate"
// FORM CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import { parseFormDataToObj } from '../../../functions/parsers'

const { header, inputs, addEventButton, goBackButton } = CONFIG
const { APP_ROUTES } = ROUTES

const AddEvent = () => {
  const params = useParams()
  let navigate = useNavigate()
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT)

  const handleSubmitNewEvent = async (formData) => {
    const eventInfo = {
      ...parseFormDataToObj(formData),
      associatedPets: [params.petId]
    }

    console.warn(eventInfo)

    await createEvent({
      variables: { eventInfo }
    })

    navigate(APP_ROUTES.LIST_MY_PETS)
  }

  return (
    <FormTemplate
      header={header}
      loading={loading}
      errors={error}
      inputs={inputs}
      formButtons={[
        addEventButton,
        {
          ...goBackButton,
          onClick: () => navigate(APP_ROUTES.LIST_MY_PETS)
        }
      ]}
      onFormSubmit={handleSubmitNewEvent}
    />
  )
}

export default AddEvent