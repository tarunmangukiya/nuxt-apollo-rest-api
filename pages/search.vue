<template>
  <div>
    <ul>
      <li v-for="item in results.response.items.data" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    results: {
      query: gql`
        query results {
          results @rest(type: "APIPayload", path: "v2/items") {
            status
            response @type(name: "ResponsePayload") {
              items @type(name: "Pagination") {
                data @type(name: "Item") {
                  id
                  name
                  slug
                  price
                  urls
                }
              }
            }
          }
        }
      `,
    },
  },
}
</script>
