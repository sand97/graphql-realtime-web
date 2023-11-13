import { gql } from '__generated__/gql';

gql(/* GraphQL */ `
  fragment CategoryFields on Category {
    name
    description
    createdAt
    updatedAt
  }
`);

export const CATEGORIES_QUERY = gql(/* GraphQL */ `
  query categories {
    categories {
      id
      ...CategoryFields
    }
  }
`);

export const CREATE_CATEGORY_MUTATION = gql(/* GraphQL */ `
  mutation createCategory($name: String!, $description: String!) {
    createCategory(input: { name: $name, description: $description }) {
      id
      ...CategoryFields
    }
  }
`);

export const UPDATE_CATEGORY_MUTATION = gql(/* GraphQL */ `
  mutation updateCategory($id: ID!, $name: String, $description: String) {
    updateCategory(input: { id: $id, name: $name, description: $description }) {
      id
      ...CategoryFields
    }
  }
`);

export const DELETE_CATEGORY_MUTATION = gql(/* GraphQL */ `
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`);
