import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation ($payload: UserLoginPayload!) {
    loginUser(payload: $payload) {
      loggedUser {
        name
        lastName
        email
      }
      token
    }
  }
`

export const CREATE_USER = gql`
  mutation ($payload: UserCreatePayload!) {
    createUser(payload: $payload) {
      name
      lastName
      email
      token
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($payload: UserUpdatePayload!) {
    updateUser(payload: $payload) {
      name
      lastName
    }
  }
`

export const UPDATE_PASS = gql`
  mutation ($payload: UserPassUpdatePayload!) {
    updatePass(payload: $payload)
  }
`

export const LOGOUT = gql`
  mutation {
    logout
  }
`

export const CREATE_PET = gql`
  mutation ($payload: PetCreatePayload!) {
    createPet(payload: $payload) {
      name
    }
  }
`

export const UPDATE_PET = gql`
  mutation ($id: String!, $payload: PetCreatePayload!) {
    updatePet(id: $id, payload: $payload)
  }
`

export const CREATE_EVENT = gql`
  mutation ($payload: EventCreatePayload!) {
    createEvent(payload: $payload) {
      description
      date
    }
  }
`
