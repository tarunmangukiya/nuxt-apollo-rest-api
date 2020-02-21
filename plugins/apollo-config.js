import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'

// setup your `RestLink` with your endpoint
const restLink = new RestLink({ uri: 'https://api.iconscout.com/' })

// setup your client
export default function({ app, store, req, res, redirect }) {
  return {
    link: restLink,
    cache: new InMemoryCache(),
  }
}
