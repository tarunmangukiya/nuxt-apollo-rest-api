<template>
  <div>
    <h1 v-if="$apollo.queries.results.loading">Loading...</h1>
    <template v-else>
      <div class="d-flex flex-wrap">
        <div
          v-for="item in results.response.items.data"
          :key="item.id"
          class="m-2"
        >
          <div class="p-2 border rounded">
            <img :src="item.urls.png_128" width="128" />
          </div>
        </div>
      </div>

      <b-pagination
        v-model="currentPage"
        :total-rows="results.response.items.total"
        :per-page="results.response.items.per_page"
      />
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
                total
                current_page
                last_page
                per_page
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

  computed: {
    currentPage: {
      get() {
        return this.results.response.items.current_page
      },
      set(page) {
        this.$router.push({
          name: this.$route.name,
          query: {
            ...this.$route.query,
            page,
          },
        })
      },
    },
  },
}
</script>

<style></style>
