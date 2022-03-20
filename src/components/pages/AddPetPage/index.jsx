import React from 'react'
import { useHistory } from 'react-router'
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, addPetButton, goToHomeButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
import { useQuery } from '@apollo/client'
import { GET_PET_TYPES } from '../../../graphql/queries'

const AddPetPage = () => {
  let history = useHistory()

  const {
    loading,
    data: { getPetTypes }
  } = useQuery(GET_PET_TYPES)

  const onSubmitNewPet = data => {
    console.error(
      Object.keys(data)
        .map(key => ({ [key]: data[key] ?? false }))
        .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    )
  }

  return (
    <FormTemplate
      header={header}
      inputs={{
        ...inputs,
        type: {
          ...inputs.type,
          options: getPetTypes.map(({ id, name }) => ({ value: id, label: name }))
        }
      }}
      formButtons={[
        addPetButton,
        {
          ...goToHomeButton,
          onClick: () => history.push(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={formData => onSubmitNewPet(formData)}
      dataFetched={!loading}
    />
  )
}

export default AddPetPage
