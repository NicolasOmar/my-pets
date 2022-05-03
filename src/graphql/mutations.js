import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      name
      lastName
      email
      token
    }
  }
`

export const CREATE_USER = gql`
  mutation ($newUser: UserInput!) {
    createUser(newUser: $newUser) {
      name
      lastName
      email
      token
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($name: String!, $lastName: String!) {
    updateUser(name: $name, lastName: $lastName) {
      name
      lastName
    }
  }
`

export const UPDATE_PASS = gql`
  mutation ($oldPass: String!, $newPass: String!) {
    updatePass(oldPass: $oldPass, newPass: $newPass)
  }
`

export const CREATE_PET = gql`
  mutation ($petInfo: PetInput!) {
    createPet(petInfo: $petInfo) {
      name
    }
  }
`

export const LOGOUT = gql`
  mutation {
    logout
  }
`
