import {ApolloClient, split, HttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SecureLS from 'secure-ls';
import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import { getMainDefinition } from '@apollo/client/utilities';

const ls = new SecureLS({ encodingType: 'aes' });

const httpLink = new HttpLink({
  uri: 'http://localhost:3008/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3008/graphql',
  connectionParams: {

  }
}));




const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = ls.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
);

export const cache = new InMemoryCache({
  addTypename: true,
  typePolicies: {},
});

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache,
  ssrMode: false
});
