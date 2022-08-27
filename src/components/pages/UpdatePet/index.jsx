import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// GRAPHQL CLIENT
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_COLORS, GET_PET, GET_PET_TYPES } from '../../../graphql/queries'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, dividers, addPetButton, goToList } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { parseDropdownOptions } from '../../../functions/parsers'

const UpdatePet = () => {
  const params = useParams()
  let navigate = useNavigate()
  const { loading: loadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  const { loading: loadingColors, data: colors } = useQuery(GET_COLORS)
  const [getPet, { loading: loadingPet, data }] = useLazyQuery(GET_PET)

  useEffect(
    () => params.petName && getPet({ variables: { name: params.petName } }),
    [params, getPet]
  )
  useEffect(() => data && console.warn(data?.getPet), [data])

  return (
    <FormTemplate
      header={header}
      isLoading={false}
      isFetching={loadingPetTypes || loadingColors || loadingPet}
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
