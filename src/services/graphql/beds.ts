import { gql } from '../../__generated__';

gql(/* GraphQL */ `
  fragment BedFields on Bed {
    id
    level
    number
    updatedAt
    createdAt
  }
`);

export const BEDS_QUERY = gql(/* GraphQL */ `
  query beds($payload: FetchBedsInput!) {
    beds(payload: $payload) {
      data {
        id
        ...BedFields
      }
      count
    }
  }
`);

export const CREATE_BED_MUTATION = gql(/* GraphQL */ `
  mutation createBed($input: NewBedInput!) {
    createBed(
      input: $input
    ) {
      id
      ...BedFields
    }
  }
`);

export const UPDATE_BED_MUTATION = gql(/* GraphQL */ `
  mutation updateBed($input: UpdateBedInput!) {
    updateBed(
      input: $input 
    ) {
      id
      ...BedFields
    }
  }
`);

export const DELETE_BED_MUTATION = gql(/* GraphQL */ `
  mutation deleteBed($id: ID!) {
    deleteBed(id: $id) {
      id
    }
  }
`);
