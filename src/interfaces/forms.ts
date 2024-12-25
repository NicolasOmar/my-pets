interface Entity {
  id: string | number
  name: string
}

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

export interface PetFormikProps {
  formIsWorking: boolean
  petTypes?: Entity[]
  colors?: Entity[]
}
