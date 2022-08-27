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
import { parseDropdownOptions, parseIdsToStrings } from '../../../functions/parsers'

const UpdatePet = () => {
  const params = useParams()
  let navigate = useNavigate()
  const [isBlankForm, setIsBlankForm] = useState(true)
  const { loading: isLoadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  const { loading: isLoadingColors, data: colors } = useQuery(GET_COLORS)
  const [getPet, { data: petData }] = useLazyQuery(GET_PET)

  useEffect(
    () => params.petName && getPet({ variables: { name: params.petName } }),
    [params, getPet]
  )

  useEffect(() => {
    const complexProps = [
      { prop: 'petType', stringList: petTypes?.getPetTypes },
      { prop: 'hairColors', stringList: colors?.getColors },
      { prop: 'eyeColors', stringList: colors?.getColors }
    ]

    if (petData) {
      Object.keys(inputs).forEach(key => {
        const isComplexProp = complexProps.find(({ prop }) => prop === key) ?? null
        const dataProp = isComplexProp
          ? {
              selected: parseIdsToStrings(petData?.getPet[key], isComplexProp.stringList),
              isMultiple: Array.isArray(petData?.getPet[key])
            }
          : { value: petData?.getPet[key] }

        inputs[key] = {
          ...inputs[key],
          ...dataProp
        }

        console.warn(key, dataProp, petData?.getPet[key], inputs[key])
      })

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
