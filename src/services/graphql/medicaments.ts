import { gql } from '../../__generated__';

gql(/* GraphQL */ `
  fragment MedicamentFields on Medicament {
    id
    name
    image
    price
    stock
    description
    category {
      name
      description
    }
  }
`);

export const MEDICAMENTS_QUERY = gql(/* GraphQL */ `
  query medicaments($page: Int!, $limit: Int!, $keyword: String) {
    medicaments(payload: { limit: $limit, page: $page, keyword: $keyword }) {
      medicaments {
        id
        ...MedicamentFields
      }
      count
    }
  }
`);

export const CREATE_MEDICAMENT_MUTATION = gql(/* GraphQL */ `
  mutation createMedicament(
    $name: String!
    $description: String!
    $price: Float!
    $stock: Int!
    $image: String!
    $categoryId: ID!
  ) {
    createMedicament(
      input: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        image: $image
        categoryId: $categoryId
      }
    ) {
      id
      ...MedicamentFields
    }
  }
`);

export const UPDATE_MEDICAMENT_MUTATION = gql(/* GraphQL */ `
  mutation updateMedicament(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $stock: Int
    $image: String
    $categoryId: ID
  ) {
    updateMedicament(
      input: {
        id: $id
        name: $name
        description: $description
        price: $price
        stock: $stock
        image: $image
        categoryId: $categoryId
      }
    ) {
      id
      ...MedicamentFields
    }
  }
`);

export const DELETE_MEDICAMENT_MUTATION = gql(/* GraphQL */ `
  mutation deleteMedicament($id: ID!) {
    deleteMedicament(id: $id) {
      id
    }
  }
`);
