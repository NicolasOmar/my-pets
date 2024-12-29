// BASE
interface Token {
  token: string
}

interface UserObject {
  name: string
  lastName: string
  userName: string
  email: string
  password: string
  tokens: Token[]
}

type LoggedUser = Omit<UserObject, 'password' | 'tokens'>

interface UserAndToken {
  loggedUser: LoggedUser
  token?: string
}

export interface Entity {
  id: string | number
  name: string
}

interface PetObject {
  id: string
  name: string
  petType: string
  birthday: string | null
  isAdopted: boolean
  adoptionDate: string | null
  height: number | null
  length: number | null
  weight: number | null
  gender: boolean
  hairColors: string[]
  eyeColors: string[]
  hasHeterochromia: boolean
  passedAway: boolean
  user: UserObject
}

// PAYLOADS
export interface UserLoginPayload {
  payload: Pick<UserObject, 'email' | 'password'>
}

export interface UserCreatePayload {
  payload: Omit<UserObject, 'tokens'>
}

export interface PetCreatePayload {
  payload: Omit<PetObject, 'id' | 'user'>
}

// RESPONSES
export interface UserLoginResponse {
  loginUser: UserAndToken
}

export interface UserCreateResponse {
  createUser: LoggedUser & {
    token: string
  }
}

export interface PetTypesResponse {
  getPetTypes: Entity[]
}

export interface ColorsResponse {
  getColors: Entity[]
}

export interface PetCreateResponse {
  createPet: PetObject
}

interface NameOnlyObject {
  name: string
}

interface PetResponse extends Omit<PetObject, 'petType' | 'hairColors' | 'eyeColors' | 'user'> {
  petType: NameOnlyObject
  hairColors: NameOnlyObject[]
  eyeColors: NameOnlyObject[]
}

export interface MyPetsResponse {
  getMyPets: PetResponse[]
}
