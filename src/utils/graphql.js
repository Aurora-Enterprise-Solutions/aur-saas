import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from '@/static/graphql.schema.json'

const fragmentMatcher = new IntrospectionFragmentMatcher( {
    introspectionQueryResultData,
} )

export default new ApolloClient( {
    link  : new HttpLink( { uri: `${process.env.NUXT_ENV_API_HOST}/graphql` } ),
    cache : new InMemoryCache( {
        fragmentMatcher,
    } ),
} )
