import { Entity, GetPetResponseUnit, IdNameObject } from './graphql'

// FORM DATA
export interface LoginFormData {
  email: string
  password: string
}

export interface UserFormData {
  name: string
  lastName: string
  userName: string
  email: string
  password: string
  repeatPass: string
}

export interface PetFormData {
  name: string
  petType: string
  birthday: string
  isAdopted: string
  adoptionDate: string
  weight: number
  gender: string
  hairColors: string[]
  eyeColors: string
  hasHeterochromia: boolean
  passedAway: boolean
}

export interface UserUpdateFormData {
  name: string
  lastName: string
}

export interface PassUpdateFormData {
  oldPass: string
  newPass: string
  repeatPass: string
}

export interface EventFormData {
  pet: string
  description: string
  date: string
}

// FORMIK CONFIGURATIONS
export interface PetFormikProps {
  formIsWorking: boolean
  petTypes?: Entity[]
  colors?: Entity[]
  petData?: GetPetResponseUnit
  handleSubmit: (petFormData: PetFormData) => void
}

export interface EventFormikProps {
  petId: string
  petList: IdNameObject[]
  formIsWorking: boolean
  handleSubmit: (eventFormData: EventFormData) => void
}
