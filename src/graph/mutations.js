import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      token
    }
  }
`
