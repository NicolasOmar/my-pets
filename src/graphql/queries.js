import { gql } from '@apollo/client'

export const GET_PET_TYPES = gql`
  query {
    getPetTypes {
      id
      name
    }
  }
`

export const GET_COLORS = gql`
  query {
    getColors {
      id
      name
    }
  }
`
