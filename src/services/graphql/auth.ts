import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
    query LOGIN_QUERY($email: String!, $password: String!) {
      login(loginInput: { email:$email, password: $password }) {
        Authorization,
        user {
          name
          surname
          email
        }
      }
}`