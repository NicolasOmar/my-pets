interface Token {
  token: string
}

interface Entity {
  id: string
  _id: string
}

export interface UserObject {
  name: string
  lastName: string
  userName: string
  email: string
  password: string
  tokens: Token[]
}

export type LoggedUser = Omit<UserObject, 'password' | 'tokens'>

export interface UserAndToken {
  loggedUser: LoggedUser
  token?: string
}

// PAYLOADS
export interface UserLoginPayload {
  payload: Pick<UserObject, 'email' | 'password'>
}

export interface UserCreatePayload {
  payload: Omit<UserObject, 'tokens'>
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

export interface QuantityEntity {
  name: string
  quantity: number
}
