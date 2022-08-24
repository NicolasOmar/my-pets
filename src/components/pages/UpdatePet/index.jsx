import React from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_COLORS, GET_PET_TYPES } from '../../../graphql/queries'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, dividers, addPetButton, goToList } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { parseDropdownOptions } from '../../../functions/parsers'

const UpdatePet = () => {
  let navigate = useNavigate()
  const { loading: loadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  const { loading: loadingColors, data: colors } = useQuery(GET_COLORS)

  return (
    <FormTemplate
      header={header}
      isLoading={false}
      isFetching={loadingPetTypes || loadingColors}
      inputs={{
        ...inputs,
        petType: {
          ...inputs.petType,
          options: parseDropdownOptions({
            selection: petTypes?.getPetTypes,
            idOriginal: 'name'
          })
        },
        hairColors: {
          ...inputs.hairColors,
          options: parseDropdownOptions({
            selection: colors?.getColors,
            idOriginal: 'name'
          })
        },
        eyeColors: {
          ...inputs.eyeColors,
          options: parseDropdownOptions({
            selection: colors?.getColors,
            idOriginal: 'name'
          })
        }
      }}
      dividers={dividers}
      formButtons={[
        addPetButton,
        {
          ...goToList,
          onClick: () => navigate(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={formData => console.warn(formData)}
    />
  )
}

export default UpdatePet
