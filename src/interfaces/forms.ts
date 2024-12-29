import { Entity, GetPetResponseUnit } from './graphql'

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
  isAdopted: boolean
  adoptionDate: string
  height: number
  length: number
  weight: number
  gender: boolean
  hairColors: string[]
  eyeColors: string
  hasHeterochromia: boolean
  passedAway: boolean
}

// FORMIK CONFIGURATIONS
export interface PetFormikProps {
  formIsWorking: boolean
  petTypes?: Entity[]
  colors?: Entity[]
  petData?: GetPetResponseUnit
  handleSubmit: (petFormData: PetFormData) => void
}
