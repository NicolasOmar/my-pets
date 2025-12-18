// INTERFACES
import { PetFormData } from '@interfaces/forms'
import { ColorListResponse, PetTypeListResponse } from '@interfaces/graphql'
// CONSTANTS
import { COMMON_LABELS } from '@constants/common'
// FUNCTIONS
import { nullifyValue, parseToLuxonDate, getDataFromArrays } from '@functions/parsers'

export const parsePetFormData = (
  formData: PetFormData,
  petTypes?: PetTypeListResponse,
  colors?: ColorListResponse
) => {
  const birthday = nullifyValue({
    value: formData.birthday,
    nullableValue: '',
    valueToShow: parseToLuxonDate(formData.birthday)
  })
  const adoptionDate = nullifyValue({
    value: formData.adoptionDate,
    nullableValue: '',
    valueToShow: parseToLuxonDate(formData.adoptionDate)
  })

  return {
    name: formData.name,
    birthday,
    isAdopted: formData.isAdopted === 'true',
    adoptionDate,
    weight: formData.weight,
    gender: formData.gender === COMMON_LABELS.MASCULINE.toLowerCase(),
    petType:
      (petTypes?.getPetTypes ?? []).find(_type => formData.petType === _type.id)?.id.toString() ??
      '',
    hairColors: getDataFromArrays(formData.hairColors, colors?.getColors ?? [], 'id', 'id'),
    hasHeterochromia: !!formData.hasHeterochromia,
    eyeColors: [
      (colors?.getColors ?? []).find(_color => formData.eyeColors === _color.id)?.id.toString() ??
        ''
    ],
    passedAway: formData.passedAway
  }
}
