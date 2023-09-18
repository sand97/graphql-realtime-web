import { gql } from '__generated__/gql';

export const LOGIN_QUERY = gql(/* GraphQL */ `
  query login($email: String!, $password: String!) {
      login(loginInput: { email:$email, password: $password }) {
        Authorization,
        user {
            id
            name
            surname
            email
            avatar
        }
      }
}`)