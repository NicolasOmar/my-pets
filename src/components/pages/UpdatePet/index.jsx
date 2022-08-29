import React, { useState, useEffect } from 'react'
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
import {
  parseDateString,
  parseDropdownOptions,
  parseIdsToStrings
} from '../../../functions/parsers'

const UpdatePet = () => {
  const params = useParams()
  let navigate = useNavigate()
  const [isBlankForm, setIsBlankForm] = useState(true)
  const { loading: isLoadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  const { loading: isLoadingColors, data: colors } = useQuery(GET_COLORS)
  const [getPet, { data: petData }] = useLazyQuery(GET_PET)

  useEffect(() => params.petId && getPet({ variables: { id: params.petId } }), [params, getPet])

  useEffect(() => {
    const complexProps = [
      { prop: 'petType', stringList: petTypes?.getPetTypes },
      { prop: 'hairColors', stringList: colors?.getColors },
      { prop: 'eyeColors', stringList: colors?.getColors }
    ]

    if (petData) {
      Object.keys(inputs).forEach(key => {
        let dataProp = null
        const isComplexProp = complexProps.find(({ prop }) => prop === key) ?? null

        switch (inputs[key].type) {
          case 'date':
            dataProp = { value: parseDateString(petData?.getPet[key], null, 'yyyy-LL-dd') }
            break
          case 'select':
            dataProp = {
              selected: parseIdsToStrings(petData?.getPet[key], isComplexProp.stringList),
              isMultiple: Array.isArray(petData?.getPet[key])
            }
            break
          default:
            dataProp = { value: petData?.getPet[key] }
        }

        inputs[key] = {
          ...inputs[key],
          ...dataProp
        }
      })

      inputs.adoptionDate.isVisible = inputs.isAdopted.value
      setIsBlankForm(false)
    }
  }, [petData, petTypes, colors])

  return (
    <FormTemplate
      header={header}
      isLoading={false}
      isFetching={isLoadingPetTypes || isLoadingColors || isBlankForm}
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
          onClick: () => navigate(APP_ROUTES.LIST_MY_PETS)
        }
      ]}
      onFormSubmit={formData => console.warn(formData)}
    />
  )
}

export default UpdatePet
