import React from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation, useQuery } from '@apollo/client'
import { GET_COLORS, GET_PET_TYPES } from '../../../graphql/queries'
import { CREATE_PET } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, dividers, addPetButton, goToHomeButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import validators from '../../../functions/validators'
import {
  parseDate,
  parseDropdownOptions,
  parseFormData,
  parseNumber
} from '../../../functions/parsers'

const getPropsIds = (prop, list, searchMultiple = false) => {
  return searchMultiple
    ? (Array.isArray(prop) ? prop : [prop])?.map(
        propName => list?.find(({ name }) => propName === name)?.id
      )
    : list?.find(({ name }) => prop === name)?.id
}

const AddPetPage = () => {
  let navigate = useNavigate()
  const [createPet, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_PET)
  const { loading: loadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  const { loading: loadingColors, data: colors } = useQuery(GET_COLORS)

  const onSubmitNewPet = async formData => {
    const petObj = parseFormData(formData)

    const petInfo = {
      ...petObj,
      birthday: parseDate(petObj?.birthday),
      isAdopted: !!petObj.isAdopted,
      adoptionDate: parseDate(petObj?.adoptionDate),
      height: parseNumber(petObj.height),
      length: parseNumber(petObj.length),
      weight: parseNumber(petObj.weight),
      gender: petObj.gender === inputs.gender.options[1].control,
      petType: getPropsIds(petObj?.petType, petTypes?.getPetTypes),
      hairColors: getPropsIds(petObj?.hairColors, colors?.getColors, true),
      hasHeterochromia: !!petObj.hasHeterochromia,
      eyeColors: getPropsIds(petObj?.eyeColors, colors?.getColors, true)
    }

    console.error(petObj, petInfo)
    await createPet({
      variables: { petInfo }
    })
    navigate(APP_ROUTES.HOME)
  }

  const onInputBlurChange = formData => {
    const { isAdopted, adoptionDate, birthday, hasHeterochromia, eyeColors } = formData
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
      eyeColors: {
        ...eyeColors,
        isMultiple: hasDiffEyes,
        optionsShown: hasDiffEyes ? 3 : 1,
        firstNullOption: !hasDiffEyes,
        value: eyeColors.isMultiple !== hasDiffEyes ? null : eyeColors.value
      }
    }
  }

  return (
    <FormTemplate
      header={header}
      isLoading={loadingCreate}
      isFetching={loadingPetTypes || loadingColors}
      errors={errorCreate}
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
          ...goToHomeButton,
          onClick: () => navigate(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={formData => onSubmitNewPet(formData)}
      onInputBlurChange={onInputBlurChange}
    />
  )
}

export default AddPetPage
