<template>
  <div class="d-flex flex-wrap">
    <template v-if="results">
      <div
        v-for="item in results.response.items.data"
        :key="item.id"
        class="m-2"
      >
        <div class="p-2 border rounded">
          <img :src="item.urls.png_128" width="128" />
        </div>
      </div>
    </template>
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

<style></style>
