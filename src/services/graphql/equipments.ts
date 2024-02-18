import { gql } from '../../__generated__';

gql(/* GraphQL */ `
  fragment EquipmentFields on Equipment {
    id
    name
    description
    serialNumber
    updatedAt
    createdAt
  }
`);

export const EQUIPMENTS_QUERY = gql(/* GraphQL */ `
  query equipments($payload: FetchEquipmentsInput!) {
    equipments(payload: $payload) {
      data {
        id
        ...EquipmentFields
      }
      count
    }
  }
`);

export const CREATE_EQUIPMENT_MUTATION = gql(/* GraphQL */ `
  mutation createEquipment($input: NewEquipmentInput!) {
    createEquipment(
      input: $input
    ) {
      id
      ...EquipmentFields
    }
  }
`);

export const UPDATE_EQUIPMENT_MUTATION = gql(/* GraphQL */ `
  mutation updateEquipment($input: UpdateEquipmentInput!) {
    updateEquipment(
      input: $input 
    ) {
      id
      ...EquipmentFields
    }
  }
`);

export const DELETE_EQUIPMENT_MUTATION = gql(/* GraphQL */ `
  mutation deleteEquipment($id: ID!) {
    deleteEquipment(id: $id) {
      id
    }
  }
`);
