// BASE
interface Token {
  token: string
}

interface UserEntity {
  name: string
  lastName: string
  userName: string
  email: string
  password: string
  tokens: Token[]
}

type LoggedUser = Omit<UserEntity, 'password' | 'tokens'>

interface UserAndToken {
  loggedUser: LoggedUser
  token?: string
}

export type UserWithToken = LoggedUser & {
  token: string
}

export interface Entity {
  id: string | number
  name: string
}

interface PetEntity {
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
  user: UserEntity
}

export interface EventObject {
  id: string
  description: string
  date: string
  associatedPets: string[]
}

// PAYLOADS
interface NameOnlyObject {
  name: string
}

interface IdOnlyObject {
  id: string
}

interface PetListItemResponse
  extends Omit<PetEntity, 'petType' | 'hairColors' | 'eyeColors' | 'user'> {
  petType: NameOnlyObject
  hairColors: NameOnlyObject[]
  eyeColors: NameOnlyObject[]
}

export interface UserLoginPayload {
  payload: Pick<UserEntity, 'email' | 'password'>
}

export interface UserCreatePayload {
  payload: Omit<UserEntity, 'tokens'>
}

export interface PetCreatePayload {
  payload: Omit<PetEntity, 'id' | 'user'>
}

export interface PetUpdateResponse extends PetCreatePayload {
  id: string
}

export interface UserUpdatePayload {
  payload: {
    name: string
    lastName: string
  }
}

export interface UserPassUpdatePayload {
  payload: {
    oldPass: string
    newPass: string
  }
}

export interface EventCreatePayload {
  payload: Omit<EventObject, 'id'>
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

export interface PetTypeListResponse {
  getPetTypes: Entity[]
}

export interface ColorListResponse {
  getColors: Entity[]
}

export interface PetCreateResponse {
  createPet: PetEntity
}

export interface PetListResponse {
  getMyPets: PetListItemResponse[]
}

export interface GetPetResponseUnit
  extends Omit<PetEntity, 'petType' | 'hairColors' | 'eyeColors' | 'user'> {
  petType: IdOnlyObject
  hairColors: IdOnlyObject[]
  eyeColors: IdOnlyObject[]
}

export interface PetGetResponse {
  getPet: GetPetResponseUnit
}

export interface UserUpdateResponse {
  updateUser: LoggedUser & {
    token: string
  }
}

export interface UserPassUpdateResponse {
  updatePass: boolean
}

export interface EventCreateResponse {
  createEvent: EventObject
}

export interface EventListResponse {
  getMyPetEvents: Omit<EventObject, 'id'>[]
}

export interface PetPopulationResponse {
  getMyPetsPopulation: { name: string; quantity: number }[]
}
