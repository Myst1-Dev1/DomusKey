import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: 'https://domus-key-api.vercel.app/api/graphql' }),
    cache: new InMemoryCache(),
  };
}

export const apolloProviders = [
  Apollo,       // <- provider obrigatório
  HttpLink,     // <- provider obrigatório

  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  },
];