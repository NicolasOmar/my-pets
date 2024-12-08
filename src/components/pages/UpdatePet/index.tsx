import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// GRAPHQL CLIENT
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_COLORS_QUERY, GET_PET_QUERY, GET_PET_TYPES_QUERY } from '../../../graphql/queries'
import { UPDATE_PET } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes'
// FUNCTIONS
import {
  searchNamesFromIds,
  parseDate,
  parseDateString,
  parseDropdownOptions,
  parseFormDataToObj,
  searchIdsFromNames,
  parseNumber
} from '../../../functions/parsers'
import validators from '../../../functions/validators'

const { header, inputs, dividers, addPetButton, goToList } = CONFIG
const { APP_ROUTES } = ROUTES

const UpdatePet = () => {
  const params = useParams()
  let navigate = useNavigate()
  const [isLoadingPet, setIsLoadingPet] = useState(true)
  const { loading: isLoadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES_QUERY)
  const { loading: isLoadingColors, data: colors } = useQuery(GET_COLORS_QUERY)
  const [getPet, { data: petData }] = useLazyQuery(GET_PET_QUERY, { fetchPolicy: 'no-cache' })
  const [updatePet, { loading: isUpdating, error: errorUpdate }] = useMutation(UPDATE_PET)

  useEffect(() => params.petId && getPet({ variables: { id: params.petId } }), [params, getPet])

  useEffect(() => {
    const complexProps = [
      { prop: 'petType', stringList: petTypes?.getPetTypes },
      { prop: 'hairColors', stringList: colors?.getColors },
      { prop: 'eyeColors', stringList: colors?.getColors }
    ]

    if (petData) {
      const { hasHeterochromia, isAdopted } = petData.getPet

      Object.keys(inputs).forEach(key => {
        let dataProp = null
        const isComplexProp = complexProps.find(({ prop }) => prop === key)

        switch (inputs[key].type) {
          case 'date':
            dataProp = { value: parseDateString(petData?.getPet[key], null, 'yyyy-LL-dd') }
            break
          case 'select': {
            const selectValue = searchIdsFromNames(petData?.getPet[key], isComplexProp.stringList)
            dataProp = {
              value: selectValue,
              selected: selectValue,
              isMultiple: Array.isArray(petData?.getPet[key])
            }
            break
          }
          default:
            dataProp = { value: petData?.getPet[key] ?? '' }
        }

        inputs[key] = {
          ...inputs[key],
          ...dataProp
        }
      })

      inputs.eyeColors = {
        ...inputs.eyeColors,
        value: hasHeterochromia ? inputs.eyeColors.value : inputs.eyeColors.value[0],
        selected: hasHeterochromia ? inputs.eyeColors.selected : inputs.eyeColors.selected[0],
        isMultiple: hasHeterochromia
      }

      inputs.adoptionDate = {
        ...inputs.adoptionDate,
        isVisible: isAdopted
      }

      setIsLoadingPet(false)
    }
  }, [petData, petTypes, colors])

  const onSubmitUpdatePet = async formData => {
    const petObj = parseFormDataToObj(formData)
    console.warn('onSubmitUpdatePet', formData, petObj)

    const petInfo = {
      ...petObj,
      id: params.petId,
      birthday: parseDate(petObj?.birthday),
      isAdopted: !!petObj.isAdopted,
      adoptionDate: parseDate(petObj?.adoptionDate),
      height: parseNumber(petObj.height),
      length: parseNumber(petObj.length),
      weight: parseNumber(petObj.weight),
      petType: searchNamesFromIds(petObj?.petType, petTypes?.getPetTypes),
      hairColors: searchNamesFromIds(petObj?.hairColors, colors?.getColors, true),
      hasHeterochromia: !!petObj.hasHeterochromia,
      eyeColors: searchNamesFromIds(petObj?.eyeColors, colors?.getColors, true),
      passedAway: !!petObj.passedAway
    }

    const updateResponse = await updatePet({ variables: { petInfo } })

    updateResponse && navigate(APP_ROUTES.LIST_MY_PETS)
  }

  const onInputBlurChange = formData => {
    const { isAdopted, petType, adoptionDate, birthday, hasHeterochromia, hairColors, eyeColors } =
      formData
    const isAdoptedSelected = isAdopted.value === true
    const hasCorrectDates =
      !isAdoptedSelected || !validators.dateIsBefore(adoptionDate.value, birthday.value)
    const hasDiffEyes = !!hasHeterochromia.value

    return {
      ...formData,
      isAdopted: {
        ...formData.isAdopted,
        value: isAdoptedSelected
      },
      petType: {
        ...petType,
        selected: petType.value
      },
      birthday: {
        ...formData.birthday,
        isValid: hasCorrectDates
      },
      adoptionDate: {
        ...formData.adoptionDate,
        value: isAdoptedSelected ? formData.adoptionDate.value : null,
        isVisible: isAdoptedSelected,
        isRequired: isAdoptedSelected,
        isValid: hasCorrectDates
      },
      hairColors: {
        ...hairColors,
        selected: hairColors.value
      },
      eyeColors: {
        ...eyeColors,
        isMultiple: hasDiffEyes,
        optionsShown: hasDiffEyes ? 3 : 1,
        firstNullOption: !hasDiffEyes,
        selected: eyeColors.isMultiple !== hasDiffEyes ? null : eyeColors.value
      }
    }
  }

  return (
    <FormTemplate
      header={header}
      isLoading={isUpdating}
      isFetching={isLoadingPetTypes || isLoadingColors || isLoadingPet}
      errors={errorUpdate}
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
      onFormSubmit={formData => onSubmitUpdatePet(formData)}
      onInputBlurChange={onInputBlurChange}
    />
  )
}

export default UpdatePet
