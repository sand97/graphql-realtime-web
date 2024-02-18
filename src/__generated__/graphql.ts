/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  exampleField?: Maybe<Scalars['Int']['output']>;
};

export type Bed = {
  __typename?: 'Bed';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  number: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type BedPage = {
  __typename?: 'BedPage';
  count: Scalars['Int']['output'];
  data: Array<Bed>;
};

export type CreateOrUpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type Equipment = {
  __typename?: 'Equipment';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  serialNumber: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type EquipmentPage = {
  __typename?: 'EquipmentPage';
  count: Scalars['Int']['output'];
  data: Array<Equipment>;
};

export type FetchBedsInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type FetchEquipmentsInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type FetchHospitalisationInput = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};

export type FetchUsersInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Hospitalisation = {
  __typename?: 'Hospitalisation';
  bed?: Maybe<Bed>;
  bedId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  customer?: Maybe<User>;
  endAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};

export type HospitalisationPage = {
  __typename?: 'HospitalisationPage';
  count: Scalars['Int']['output'];
  data: Array<Hospitalisation>;
};

export type LastObservationInput = {
  hospitalisationId: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type LastObservationResult = {
  __typename?: 'LastObservationResult';
  data: Array<Observation>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  Authorization: Scalars['String']['output'];
  expiresIn: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBed: Bed;
  createEquipment: Equipment;
  createHospitalisation: Hospitalisation;
  createObservation: Observation;
  createUser: User;
  deleteBed: Bed;
  deleteEquipment: Equipment;
  deleteHospitalisation: Hospitalisation;
  removeAuth?: Maybe<Auth>;
  removeUser?: Maybe<RemoveUserResponse>;
  sign: LoginResponse;
  updateAuth: Auth;
  updateBed: Bed;
  updateEquipment: Equipment;
  updateHospitalisation: Hospitalisation;
  updatePassword: User;
  updateUser: User;
};


export type MutationCreateBedArgs = {
  input: NewBedInput;
};


export type MutationCreateEquipmentArgs = {
  input: NewEquipmentInput;
};


export type MutationCreateHospitalisationArgs = {
  input: NewHospitalisationInput;
};


export type MutationCreateObservationArgs = {
  input: NewObservationInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateOrUpdateUserInput;
};


export type MutationDeleteBedArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEquipmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteHospitalisationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveAuthArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignArgs = {
  signInput: CreateOrUpdateUserInput;
};


export type MutationUpdateAuthArgs = {
  updateAuthInput: UpdateAuthInput;
};


export type MutationUpdateBedArgs = {
  input: UpdateBedInput;
};


export type MutationUpdateEquipmentArgs = {
  input: UpdateEquipmentInput;
};


export type MutationUpdateHospitalisationArgs = {
  input: UpdateHospitalisationInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
  userId: Scalars['String']['input'];
};

export type NewBedInput = {
  level: Scalars['Int']['input'];
  number: Scalars['Int']['input'];
};

export type NewEquipmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  serialNumber: Scalars['Int']['input'];
};

export type NewHospitalisationInput = {
  bedId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type NewObservationInput = {
  equipmentId: Scalars['ID']['input'];
  hospitalisationId: Scalars['ID']['input'];
  value: Scalars['Float']['input'];
};

export type Observation = {
  __typename?: 'Observation';
  createdAt: Scalars['String']['output'];
  equipment?: Maybe<Equipment>;
  equipmentId?: Maybe<Scalars['ID']['output']>;
  hospitalisation?: Maybe<Hospitalisation>;
  hospitalisationId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  value: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<Auth>;
  bed: Bed;
  beds: BedPage;
  equipment: Equipment;
  equipments: EquipmentPage;
  hospitalisation: Hospitalisation;
  hospitalisations: HospitalisationPage;
  lastObservations: LastObservationResult;
  login: LoginResponse;
  me?: Maybe<User>;
  users: UserPage;
};


export type QueryAuthArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBedArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBedsArgs = {
  payload: FetchBedsInput;
};


export type QueryEquipmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEquipmentsArgs = {
  payload: FetchEquipmentsInput;
};


export type QueryHospitalisationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHospitalisationsArgs = {
  payload: FetchHospitalisationInput;
};


export type QueryLastObservationsArgs = {
  payload: LastObservationInput;
};


export type QueryLoginArgs = {
  loginInput: LoginInput;
};


export type QueryUsersArgs = {
  payload: FetchUsersInput;
};

export type RemoveUserResponse = {
  __typename?: 'RemoveUserResponse';
  id: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  observationAdded?: Maybe<Observation>;
};


export type SubscriptionObservationAddedArgs = {
  hospitalisationId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateAuthInput = {
  id: Scalars['Int']['input'];
};

export type UpdateBedInput = {
  id: Scalars['ID']['input'];
  level?: InputMaybe<Scalars['Int']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateEquipmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateHospitalisationInput = {
  bedId: Scalars['ID']['input'];
  endAt: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type UserPage = {
  __typename?: 'UserPage';
  count: Scalars['Int']['output'];
  users: Array<User>;
};

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginResponse', Authorization: string, user: { __typename?: 'User', id: string, name: string, surname?: string | null, email: string, avatar?: string | null } } };

export type BedFieldsFragment = { __typename?: 'Bed', id: string, level: number, number: number, updatedAt: string, createdAt: string } & { ' $fragmentName'?: 'BedFieldsFragment' };

export type BedsQueryVariables = Exact<{
  payload: FetchBedsInput;
}>;


export type BedsQuery = { __typename?: 'Query', beds: { __typename?: 'BedPage', count: number, data: Array<(
      { __typename?: 'Bed', id: string }
      & { ' $fragmentRefs'?: { 'BedFieldsFragment': BedFieldsFragment } }
    )> } };

export type CreateBedMutationVariables = Exact<{
  input: NewBedInput;
}>;


export type CreateBedMutation = { __typename?: 'Mutation', createBed: (
    { __typename?: 'Bed', id: string }
    & { ' $fragmentRefs'?: { 'BedFieldsFragment': BedFieldsFragment } }
  ) };

export type UpdateBedMutationVariables = Exact<{
  input: UpdateBedInput;
}>;


export type UpdateBedMutation = { __typename?: 'Mutation', updateBed: (
    { __typename?: 'Bed', id: string }
    & { ' $fragmentRefs'?: { 'BedFieldsFragment': BedFieldsFragment } }
  ) };

export type DeleteBedMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBedMutation = { __typename?: 'Mutation', deleteBed: { __typename?: 'Bed', id: string } };

export type EquipmentFieldsFragment = { __typename?: 'Equipment', id: string, name: string, description?: string | null, serialNumber: number, updatedAt: string, createdAt: string } & { ' $fragmentName'?: 'EquipmentFieldsFragment' };

export type EquipmentsQueryVariables = Exact<{
  payload: FetchEquipmentsInput;
}>;


export type EquipmentsQuery = { __typename?: 'Query', equipments: { __typename?: 'EquipmentPage', count: number, data: Array<(
      { __typename?: 'Equipment', id: string }
      & { ' $fragmentRefs'?: { 'EquipmentFieldsFragment': EquipmentFieldsFragment } }
    )> } };

export type CreateEquipmentMutationVariables = Exact<{
  input: NewEquipmentInput;
}>;


export type CreateEquipmentMutation = { __typename?: 'Mutation', createEquipment: (
    { __typename?: 'Equipment', id: string }
    & { ' $fragmentRefs'?: { 'EquipmentFieldsFragment': EquipmentFieldsFragment } }
  ) };

export type UpdateEquipmentMutationVariables = Exact<{
  input: UpdateEquipmentInput;
}>;


export type UpdateEquipmentMutation = { __typename?: 'Mutation', updateEquipment: (
    { __typename?: 'Equipment', id: string }
    & { ' $fragmentRefs'?: { 'EquipmentFieldsFragment': EquipmentFieldsFragment } }
  ) };

export type DeleteEquipmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEquipmentMutation = { __typename?: 'Mutation', deleteEquipment: { __typename?: 'Equipment', id: string } };

export type ObservationFieldsFragment = { __typename?: 'Observation', id: string, value: number, hospitalisationId?: string | null, equipmentId?: string | null, createdAt: string, equipment?: { __typename?: 'Equipment', id: string, name: string } | null } & { ' $fragmentName'?: 'ObservationFieldsFragment' };

export type LastObservationsQueryVariables = Exact<{
  payload: LastObservationInput;
}>;


export type LastObservationsQuery = { __typename?: 'Query', lastObservations: { __typename?: 'LastObservationResult', data: Array<(
      { __typename?: 'Observation', id: string }
      & { ' $fragmentRefs'?: { 'ObservationFieldsFragment': ObservationFieldsFragment } }
    )> } };

export type ObservationAddedSubscriptionVariables = Exact<{
  hospitalisationId: Scalars['ID']['input'];
}>;


export type ObservationAddedSubscription = { __typename?: 'Subscription', observationAdded?: (
    { __typename?: 'Observation', id: string }
    & { ' $fragmentRefs'?: { 'ObservationFieldsFragment': ObservationFieldsFragment } }
  ) | null };

export type UserFieldsFragment = { __typename?: 'User', name: string, surname?: string | null, email: string, phone?: string | null, role?: string | null } & { ' $fragmentName'?: 'UserFieldsFragment' };

export type UsersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  keyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', count: number, users: Array<(
      { __typename?: 'User', id: string }
      & { ' $fragmentRefs'?: { 'UserFieldsFragment': UserFieldsFragment } }
    )> } };

export type HospitalisationsQueryVariables = Exact<{
  payload: FetchHospitalisationInput;
}>;


export type HospitalisationsQuery = { __typename?: 'Query', hospitalisations: { __typename?: 'HospitalisationPage', count: number, data: Array<{ __typename?: 'Hospitalisation', id: string, createdAt: string, endAt: string, bed?: { __typename?: 'Bed', number: number } | null }> } };

export type CreateUserMutationVariables = Exact<{
  payload: CreateOrUpdateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: (
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'UserFieldsFragment': UserFieldsFragment } }
  ) };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  payload: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: (
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'UserFieldsFragment': UserFieldsFragment } }
  ) };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser?: { __typename?: 'RemoveUserResponse', id: string } | null };

export const BedFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BedFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BedFieldsFragment, unknown>;
export const EquipmentFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EquipmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Equipment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<EquipmentFieldsFragment, unknown>;
export const ObservationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObservationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Observation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalisationId"}},{"kind":"Field","name":{"kind":"Name","value":"equipmentId"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ObservationFieldsFragment, unknown>;
export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Authorization"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const BedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"beds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FetchBedsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"beds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BedFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BedFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BedsQuery, BedsQueryVariables>;
export const CreateBedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewBedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BedFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BedFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<CreateBedMutation, CreateBedMutationVariables>;
export const UpdateBedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BedFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BedFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UpdateBedMutation, UpdateBedMutationVariables>;
export const DeleteBedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteBedMutation, DeleteBedMutationVariables>;
export const EquipmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"equipments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FetchEquipmentsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"equipments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EquipmentFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EquipmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Equipment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<EquipmentsQuery, EquipmentsQueryVariables>;
export const CreateEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EquipmentFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EquipmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Equipment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<CreateEquipmentMutation, CreateEquipmentMutationVariables>;
export const UpdateEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EquipmentFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EquipmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Equipment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UpdateEquipmentMutation, UpdateEquipmentMutationVariables>;
export const DeleteEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteEquipmentMutation, DeleteEquipmentMutationVariables>;
export const LastObservationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lastObservations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LastObservationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastObservations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObservationFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObservationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Observation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalisationId"}},{"kind":"Field","name":{"kind":"Name","value":"equipmentId"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<LastObservationsQuery, LastObservationsQueryVariables>;
export const ObservationAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"observationAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hospitalisationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"observationAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hospitalisationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hospitalisationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObservationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObservationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Observation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"hospitalisationId"}},{"kind":"Field","name":{"kind":"Name","value":"equipmentId"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ObservationAddedSubscription, ObservationAddedSubscriptionVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const HospitalisationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"hospitalisations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FetchHospitalisationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hospitalisations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"bed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]} as unknown as DocumentNode<HospitalisationsQuery, HospitalisationsQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrUpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;