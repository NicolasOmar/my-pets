import React from 'react'
import { useHistory } from 'react-router'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
// import { GET_COLORS, GET_PET_TYPES } from '../../../graphql/queries'
import { GET_PET_TYPES } from '../../../graphql/queries'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, dividers, addPetButton, goToHomeButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import validators from '../../../functions/validators'
import { parseDropdownOptions } from '../../../functions/parsers'

const AddPetPage = () => {
  let history = useHistory()

  const { loading: loadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES)
  // const { loading: loadingColors, data: colors } = useQuery(GET_COLORS)

  const onSubmitNewPet = data => {
    const petObj = Object.keys(data)
      .map(key => ({ [key]: data[key] ?? null }))
      .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    console.error({
      ...petObj
    })
  }

  const onInputBlurChange = formData => {
    console.error(
      Object.keys(formData).map(key => `${key}: ${formData[key].value} | ${formData[key].isValid}`)
    )
    const { isAdopted, adoptionDate, birthday } = formData

    const isAdoptedSelected = isAdopted.value === true
    const hasCorrectDates =
      !isAdoptedSelected || !validators.dateIsBefore(adoptionDate.value, birthday.value)

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
          options: parseDropdownOptions({
            selection: petTypes?.getPetTypes,
            idOriginal: 'name'
          })
        }
      }}
      dividers={dividers}
      formButtons={[
        addPetButton,
        {
          ...goToHomeButton,
          onClick: () => history.push(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={formData => onSubmitNewPet(formData)}
      onInputBlurChange={onInputBlurChange}
      // dataFetched={!loadingPetTypes && !loadingColors}
      dataFetched={!loadingPetTypes}
    />
  )
}

export default AddPetPage
