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
    "\n  fragment CategoryFields on Category {\n    name\n    description\n    createdAt\n    updatedAt\n  }\n": types.CategoryFieldsFragmentDoc,
    "\n  query categories {\n    categories {\n      id\n      ...CategoryFields\n    }\n  }\n": types.CategoriesDocument,
    "\n  mutation createCategory($name: String!, $description: String!) {\n    createCategory(input: { name: $name, description: $description }) {\n      id\n      ...CategoryFields\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation updateCategory($id: ID!, $name: String, $description: String) {\n    updateCategory(input: { id: $id, name: $name, description: $description }) {\n      id\n      ...CategoryFields\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation deleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  fragment MedicamentFields on Medicament {\n    id\n    name\n    image\n    price\n    stock\n    description\n    category {\n      name\n      description\n    }\n  }\n": types.MedicamentFieldsFragmentDoc,
    "\n  query medicaments($page: Int!, $limit: Int!, $keyword: String) {\n    medicaments(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      medicaments {\n        id\n        ...MedicamentFields\n      }\n      count\n    }\n  }\n": types.MedicamentsDocument,
    "\n  mutation createMedicament(\n    $name: String!\n    $description: String!\n    $price: Float!\n    $stock: Int!\n    $image: String!\n    $categoryId: ID!\n  ) {\n    createMedicament(\n      input: {\n        name: $name\n        description: $description\n        price: $price\n        stock: $stock\n        image: $image\n        categoryId: $categoryId\n      }\n    ) {\n      id\n      ...MedicamentFields\n    }\n  }\n": types.CreateMedicamentDocument,
    "\n  mutation updateMedicament(\n    $id: ID!\n    $name: String\n    $description: String\n    $price: Float\n    $stock: Int\n    $image: String\n    $categoryId: ID\n  ) {\n    updateMedicament(\n      input: {\n        id: $id\n        name: $name\n        description: $description\n        price: $price\n        stock: $stock\n        image: $image\n        categoryId: $categoryId\n      }\n    ) {\n      id\n      ...MedicamentFields\n    }\n  }\n": types.UpdateMedicamentDocument,
    "\n  mutation deleteMedicament($id: ID!) {\n    deleteMedicament(id: $id) {\n      id\n    }\n  }\n": types.DeleteMedicamentDocument,
    "\n  fragment UserFields on User {\n    name\n    surname\n    email\n    phone\n  }\n": types.UserFieldsFragmentDoc,
    "\n  query users($page: Int!, $limit: Int!, $keyword: String) {\n    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      count\n      users {\n        id\n        ...UserFields\n      }\n    }\n  }\n": types.UsersDocument,
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
export function gql(source: "\n  fragment CategoryFields on Category {\n    name\n    description\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment CategoryFields on Category {\n    name\n    description\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query categories {\n    categories {\n      id\n      ...CategoryFields\n    }\n  }\n"): (typeof documents)["\n  query categories {\n    categories {\n      id\n      ...CategoryFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createCategory($name: String!, $description: String!) {\n    createCategory(input: { name: $name, description: $description }) {\n      id\n      ...CategoryFields\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($name: String!, $description: String!) {\n    createCategory(input: { name: $name, description: $description }) {\n      id\n      ...CategoryFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateCategory($id: ID!, $name: String, $description: String) {\n    updateCategory(input: { id: $id, name: $name, description: $description }) {\n      id\n      ...CategoryFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateCategory($id: ID!, $name: String, $description: String) {\n    updateCategory(input: { id: $id, name: $name, description: $description }) {\n      id\n      ...CategoryFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MedicamentFields on Medicament {\n    id\n    name\n    image\n    price\n    stock\n    description\n    category {\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  fragment MedicamentFields on Medicament {\n    id\n    name\n    image\n    price\n    stock\n    description\n    category {\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query medicaments($page: Int!, $limit: Int!, $keyword: String) {\n    medicaments(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      medicaments {\n        id\n        ...MedicamentFields\n      }\n      count\n    }\n  }\n"): (typeof documents)["\n  query medicaments($page: Int!, $limit: Int!, $keyword: String) {\n    medicaments(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      medicaments {\n        id\n        ...MedicamentFields\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createMedicament(\n    $name: String!\n    $description: String!\n    $price: Float!\n    $stock: Int!\n    $image: String!\n    $categoryId: ID!\n  ) {\n    createMedicament(\n      input: {\n        name: $name\n        description: $description\n        price: $price\n        stock: $stock\n        image: $image\n        categoryId: $categoryId\n      }\n    ) {\n      id\n      ...MedicamentFields\n    }\n  }\n"): (typeof documents)["\n  mutation createMedicament(\n    $name: String!\n    $description: String!\n    $price: Float!\n    $stock: Int!\n    $image: String!\n    $categoryId: ID!\n  ) {\n    createMedicament(\n      input: {\n        name: $name\n        description: $description\n        price: $price\n        stock: $stock\n        image: $image\n        categoryId: $categoryId\n      }\n    ) {\n      id\n      ...MedicamentFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateMedicament(\n    $id: ID!\n    $name: String\n    $description: String\n    $price: Float\n    $stock: Int\n    $image: String\n    $categoryId: ID\n  ) {\n    updateMedicament(\n      input: {\n        id: $id\n        name: $name\n        description: $description\n        price: $price\n        stock: $stock\n        image: $image\n        categoryId: $categoryId\n      }\n    ) {\n      id\n      ...MedicamentFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateMedicament(\n    $id: ID!\n    $name: String\n    $description: String\n    $price: Float\n    $stock: Int\n    $image: String\n    $categoryId: ID\n  ) {\n    updateMedicament(\n      input: {\n        id: $id\n        name: $name\n        description: $description\n        price: $price\n        stock: $stock\n        image: $image\n        categoryId: $categoryId\n      }\n    ) {\n      id\n      ...MedicamentFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteMedicament($id: ID!) {\n    deleteMedicament(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMedicament($id: ID!) {\n    deleteMedicament(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFields on User {\n    name\n    surname\n    email\n    phone\n  }\n"): (typeof documents)["\n  fragment UserFields on User {\n    name\n    surname\n    email\n    phone\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query users($page: Int!, $limit: Int!, $keyword: String) {\n    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      count\n      users {\n        id\n        ...UserFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query users($page: Int!, $limit: Int!, $keyword: String) {\n    users(payload: { limit: $limit, page: $page, keyword: $keyword }) {\n      count\n      users {\n        id\n        ...UserFields\n      }\n    }\n  }\n"];
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