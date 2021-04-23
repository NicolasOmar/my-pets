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
  mutation($name: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(name: $name, lastName: $lastName, email: $email, password: $password) {
      name
      email
      token
    }
  }
`
