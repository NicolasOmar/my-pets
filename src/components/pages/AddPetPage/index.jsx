import React from 'react'
import { useHistory } from 'react-router'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_PET_TYPES } from '../../../graphql/queries'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, addPetButton, goToHomeButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'

const AddPetPage = () => {
  let history = useHistory()

  const { loading, data } = useQuery(GET_PET_TYPES)

  const onSubmitNewPet = data => {
    console.error(
      Object.keys(data)
        .map(key => ({ [key]: data[key] ?? false }))
        .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    )
  }

  const onInputBlurChange = formData => {
    console.error(Object.keys(formData).map(key => `${key}: ${formData[key].value || null}`))
    const isAdopted = formData.isAdopted.value === true
    return {
      ...formData,
      adoptionDate: {
        ...formData.adoptionDate,
        isVisible: isAdopted,
        isRequired: isAdopted
      }
    }
  }

  return (
    <FormTemplate
      header={header}
      inputs={{
        ...inputs,
        type: {
          ...inputs.type,
          options: data?.getPetTypes?.map(({ id, name }) => ({ value: id, label: name })) || []
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
      onInputBlurChange={onInputBlurChange}
      dataFetched={!loading}
    />
  )
}

export default AddPetPage
