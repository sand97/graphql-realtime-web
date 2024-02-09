import { gql } from '__generated__/gql';

gql(/* GraphQL */ `
  fragment UserFields on User {
    name
    surname
    email
    phone
  }
`);

export const USERS_QUERY = gql(/* GraphQL */ `
  query users($page: Int!, $limit: Int!, $keyword: String) {
    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {
      count
      users {
        id
        ...UserFields
      }
    }
  }
`);

export const CREATE_USER_MUTATION = gql(/* GraphQL */ `
  mutation createUser($payload: CreateOrUpdateUserInput!) {
    createUser(createUserInput: $payload) {
      id
      ...UserFields
    }
  }
`);

export const UPDATE_USER_MUTATION = gql(/* GraphQL */ `
  mutation updateUser(
    $userId: String!,
    $payload: UpdateUserInput!) {
    updateUser(userId: $userId, updateUserInput: $payload) {
      id
      ...UserFields
    }
  }
`);

export const DELETE_USER_MUTATION = gql(/* GraphQL */ `
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      id
    }
  }
`);
