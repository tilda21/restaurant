/* /lib/apollo.js */

import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const apolloClient = new ApolloClient({
  uri: `${API_URL}/graphql`, // Server URL (must be absolute)
  cache: new InMemoryCache(),
});

export default apolloClient;
