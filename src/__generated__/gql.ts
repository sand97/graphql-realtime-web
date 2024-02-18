/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query login($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      Authorization\n      user {\n        id\n        name\n        surname\n        email\n        avatar\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  fragment BedFields on Bed {\n    id\n    level\n    number\n    updatedAt\n    createdAt\n  }\n": types.BedFieldsFragmentDoc,
    "\n  query beds($payload: FetchBedsInput!) {\n    beds(payload: $payload) {\n      data {\n        id\n        ...BedFields\n      }\n      count\n    }\n  }\n": types.BedsDocument,
    "\n  mutation createBed($input: NewBedInput!) {\n    createBed(\n      input: $input\n    ) {\n      id\n      ...BedFields\n    }\n  }\n": types.CreateBedDocument,
    "\n  mutation updateBed($input: UpdateBedInput!) {\n    updateBed(\n      input: $input \n    ) {\n      id\n      ...BedFields\n    }\n  }\n": types.UpdateBedDocument,
    "\n  mutation deleteBed($id: ID!) {\n    deleteBed(id: $id) {\n      id\n    }\n  }\n": types.DeleteBedDocument,
    "\n  fragment EquipmentFields on Equipment {\n    id\n    name\n    description\n    serialNumber\n    updatedAt\n    createdAt\n  }\n": types.EquipmentFieldsFragmentDoc,
    "\n  query equipments($payload: FetchEquipmentsInput!) {\n    equipments(payload: $payload) {\n      data {\n        id\n        ...EquipmentFields\n      }\n      count\n    }\n  }\n": types.EquipmentsDocument,
    "\n  mutation createEquipment($input: NewEquipmentInput!) {\n    createEquipment(\n      input: $input\n    ) {\n      id\n      ...EquipmentFields\n    }\n  }\n": types.CreateEquipmentDocument,
    "\n  mutation updateEquipment($input: UpdateEquipmentInput!) {\n    updateEquipment(\n      input: $input \n    ) {\n      id\n      ...EquipmentFields\n    }\n  }\n": types.UpdateEquipmentDocument,
    "\n  mutation deleteEquipment($id: ID!) {\n    deleteEquipment(id: $id) {\n      id\n    }\n  }\n": types.DeleteEquipmentDocument,
    "\n    fragment ObservationFields on Observation {\n        id\n        value\n        hospitalisationId\n        equipmentId\n        equipment {\n            id\n            name\n        }\n        createdAt\n    }\n": types.ObservationFieldsFragmentDoc,
    "\n    query lastObservations($payload: LastObservationInput!) {\n        lastObservations(payload: $payload) {\n            data {\n                id\n                ...ObservationFields\n            }\n        }\n    }\n": types.LastObservationsDocument,
    "\n    subscription observationAdded($hospitalisationId: ID!) {\n        observationAdded(hospitalisationId:$hospitalisationId) {\n            id\n            ...ObservationFields\n        }\n    }\n": types.ObservationAddedDocument,
    "\n    fragment UserFields on User {\n        name\n        surname\n        email\n        phone\n        role\n    }\n": types.UserFieldsFragmentDoc,
    "\n  query users($page: Int!, $limit: Int!, $keyword: String) {\n    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      count\n      users {\n        id\n        ...UserFields\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  query hospitalisations($payload: FetchHospitalisationInput!) {\n    hospitalisations(payload: $payload) {\n      count\n      data {\n        id\n        createdAt\n        endAt\n        bed {\n          number\n        }\n      }\n    }\n  }\n": types.HospitalisationsDocument,
    "\n  mutation createUser($payload: CreateOrUpdateUserInput!) {\n    createUser(createUserInput: $payload) {\n      id\n      ...UserFields\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation updateUser(\n    $userId: String!,\n    $payload: UpdateUserInput!) {\n    updateUser(userId: $userId, updateUserInput: $payload) {\n      id\n      ...UserFields\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation removeUser($id: String!) {\n    removeUser(id: $id) {\n      id\n    }\n  }\n": types.RemoveUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query login($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      Authorization\n      user {\n        id\n        name\n        surname\n        email\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query login($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      Authorization\n      user {\n        id\n        name\n        surname\n        email\n        avatar\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BedFields on Bed {\n    id\n    level\n    number\n    updatedAt\n    createdAt\n  }\n"): (typeof documents)["\n  fragment BedFields on Bed {\n    id\n    level\n    number\n    updatedAt\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query beds($payload: FetchBedsInput!) {\n    beds(payload: $payload) {\n      data {\n        id\n        ...BedFields\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query beds($payload: FetchBedsInput!) {\n    beds(payload: $payload) {\n      data {\n        id\n        ...BedFields\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createBed($input: NewBedInput!) {\n    createBed(\n      input: $input\n    ) {\n      id\n      ...BedFields\n    }\n  }\n"): (typeof documents)["\n  mutation createBed($input: NewBedInput!) {\n    createBed(\n      input: $input\n    ) {\n      id\n      ...BedFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateBed($input: UpdateBedInput!) {\n    updateBed(\n      input: $input \n    ) {\n      id\n      ...BedFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateBed($input: UpdateBedInput!) {\n    updateBed(\n      input: $input \n    ) {\n      id\n      ...BedFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteBed($id: ID!) {\n    deleteBed(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteBed($id: ID!) {\n    deleteBed(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment EquipmentFields on Equipment {\n    id\n    name\n    description\n    serialNumber\n    updatedAt\n    createdAt\n  }\n"): (typeof documents)["\n  fragment EquipmentFields on Equipment {\n    id\n    name\n    description\n    serialNumber\n    updatedAt\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query equipments($payload: FetchEquipmentsInput!) {\n    equipments(payload: $payload) {\n      data {\n        id\n        ...EquipmentFields\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query equipments($payload: FetchEquipmentsInput!) {\n    equipments(payload: $payload) {\n      data {\n        id\n        ...EquipmentFields\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createEquipment($input: NewEquipmentInput!) {\n    createEquipment(\n      input: $input\n    ) {\n      id\n      ...EquipmentFields\n    }\n  }\n"): (typeof documents)["\n  mutation createEquipment($input: NewEquipmentInput!) {\n    createEquipment(\n      input: $input\n    ) {\n      id\n      ...EquipmentFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateEquipment($input: UpdateEquipmentInput!) {\n    updateEquipment(\n      input: $input \n    ) {\n      id\n      ...EquipmentFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateEquipment($input: UpdateEquipmentInput!) {\n    updateEquipment(\n      input: $input \n    ) {\n      id\n      ...EquipmentFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteEquipment($id: ID!) {\n    deleteEquipment(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteEquipment($id: ID!) {\n    deleteEquipment(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment ObservationFields on Observation {\n        id\n        value\n        hospitalisationId\n        equipmentId\n        equipment {\n            id\n            name\n        }\n        createdAt\n    }\n"): (typeof documents)["\n    fragment ObservationFields on Observation {\n        id\n        value\n        hospitalisationId\n        equipmentId\n        equipment {\n            id\n            name\n        }\n        createdAt\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query lastObservations($payload: LastObservationInput!) {\n        lastObservations(payload: $payload) {\n            data {\n                id\n                ...ObservationFields\n            }\n        }\n    }\n"): (typeof documents)["\n    query lastObservations($payload: LastObservationInput!) {\n        lastObservations(payload: $payload) {\n            data {\n                id\n                ...ObservationFields\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription observationAdded($hospitalisationId: ID!) {\n        observationAdded(hospitalisationId:$hospitalisationId) {\n            id\n            ...ObservationFields\n        }\n    }\n"): (typeof documents)["\n    subscription observationAdded($hospitalisationId: ID!) {\n        observationAdded(hospitalisationId:$hospitalisationId) {\n            id\n            ...ObservationFields\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment UserFields on User {\n        name\n        surname\n        email\n        phone\n        role\n    }\n"): (typeof documents)["\n    fragment UserFields on User {\n        name\n        surname\n        email\n        phone\n        role\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query users($page: Int!, $limit: Int!, $keyword: String) {\n    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      count\n      users {\n        id\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query users($page: Int!, $limit: Int!, $keyword: String) {\n    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      count\n      users {\n        id\n        ...UserFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query hospitalisations($payload: FetchHospitalisationInput!) {\n    hospitalisations(payload: $payload) {\n      count\n      data {\n        id\n        createdAt\n        endAt\n        bed {\n          number\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query hospitalisations($payload: FetchHospitalisationInput!) {\n    hospitalisations(payload: $payload) {\n      count\n      data {\n        id\n        createdAt\n        endAt\n        bed {\n          number\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($payload: CreateOrUpdateUserInput!) {\n    createUser(createUserInput: $payload) {\n      id\n      ...UserFields\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($payload: CreateOrUpdateUserInput!) {\n    createUser(createUserInput: $payload) {\n      id\n      ...UserFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateUser(\n    $userId: String!,\n    $payload: UpdateUserInput!) {\n    updateUser(userId: $userId, updateUserInput: $payload) {\n      id\n      ...UserFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser(\n    $userId: String!,\n    $payload: UpdateUserInput!) {\n    updateUser(userId: $userId, updateUserInput: $payload) {\n      id\n      ...UserFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation removeUser($id: String!) {\n    removeUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeUser($id: String!) {\n    removeUser(id: $id) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;