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
interface NameOnlyObject {
  name: string
}

interface IdOnlyObject {
  id: string
}

interface MyPetsResponseUnit
  extends Omit<PetObject, 'petType' | 'hairColors' | 'eyeColors' | 'user'> {
  petType: NameOnlyObject
  hairColors: NameOnlyObject[]
  eyeColors: NameOnlyObject[]
}

export interface UserLoginPayload {
  payload: Pick<UserObject, 'email' | 'password'>
}

export interface UserCreatePayload {
  payload: Omit<UserObject, 'tokens'>
}

export interface PetCreatePayload {
  payload: Omit<PetObject, 'id' | 'user'>
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

export interface MyPetsResponse {
  getMyPets: MyPetsResponseUnit[]
}

export interface GetPetResponseUnit
  extends Omit<PetObject, 'petType' | 'hairColors' | 'eyeColors' | 'user'> {
  petType: IdOnlyObject
  hairColors: IdOnlyObject[]
  eyeColors: IdOnlyObject[]
}

export interface GetPetResponse {
  getPet: GetPetResponseUnit
}

export interface UserUpdateResponse {
  updateUser: UserObject
}

export interface UserPassUpdateResponse {
  updatePass: boolean
}
