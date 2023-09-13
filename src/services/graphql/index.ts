import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:3008/graphql',
    cache: new InMemoryCache(),
});