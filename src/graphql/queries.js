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

export const GET_MY_PETS = gql`
  query {
    getMyPets {
      name
      petType {
        name
      }
      birthday
      isAdopted
      adoptionDate
      hairColors {
        name
      }
      eyeColors {
        name
      }
    }
  }
`

export const GET_PET = gql`
  query ($name: String!) {
    getPet(name: $name) {
      name
      petType {
        id
      }
      birthday
      isAdopted
      adoptionDate
      height
      length
      weight
      gender
      hairColors {
        id
      }
      hasHeterochromia
      eyeColors {
        id
      }
    }
  }
`
