import { gql } from '@apollo/client'

export const GET_PET_TYPES_QUERY = gql`
  query {
    getPetTypes {
      id
      name
    }
  }
`

export const GET_COLORS_QUERY = gql`
  query {
    getColors {
      id
      name
    }
  }
`

export const GET_MY_PETS_QUERY = gql`
  query {
    getMyPets {
      id
      name
      petType {
        name
      }
      birthday
      isAdopted
      adoptionDate
      gender
      hairColors {
        name
      }
      hasHeterochromia
      eyeColors {
        name
      }
      passedAway
    }
  }
`

export const GET_PET_QUERY = gql`
  query ($id: ID!) {
    getPet(id: $id) {
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
      passedAway
    }
  }
`

export const GET_MY_PETS_POPULATION_QUERY = gql`
  query {
    getMyPetsPopulation {
      name
      quantity
    }
  }
`
