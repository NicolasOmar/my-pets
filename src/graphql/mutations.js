import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      name
      email
      token
    }
  }
`

export const CREATE_USER = gql`
  mutation($newUser: UserInput!) {
    newUser: createUser(newUser: $newUser) {
      name
      email
      token
    }
  }
`
