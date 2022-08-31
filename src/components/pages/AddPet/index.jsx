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
  getPropsIds,
  parseDate,
  parseDropdownOptions,
  parseFormData,
  parseNumber
} from '../../../functions/parsers'

const AddPet = () => {
  let navigate = useNavigate()
  const { loading: loadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  const { loading: loadingColors, data: colors } = useQuery(GET_COLORS)
  const [createPet, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_PET)

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
      petType: getPropsIds(petObj?.petType, petTypes?.getPetTypes),
      hairColors: getPropsIds(petObj?.hairColors, colors?.getColors, true),
      hasHeterochromia: !!petObj.hasHeterochromia,
      eyeColors: getPropsIds(petObj?.eyeColors, colors?.getColors, true)
    }

    await createPet({
      variables: { petInfo }
    })

    navigate(APP_ROUTES.LIST_MY_PETS)
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

export default AddPet
