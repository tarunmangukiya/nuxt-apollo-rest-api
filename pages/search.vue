<template>
  <div>
    <h1 v-if="$apollo.queries.results.loading">Loading...</h1>
    <template v-else>
      <div
        class="d-flex align-items-center justify-content-between sticky-top px-3 py-2 bg-light border-bottom"
      >
        <h1 class="h5 mb-0">Showing results for</h1>
        <b-pagination
          v-model="currentPage"
          :total-rows="results.response.items.total"
          :per-page="results.response.items.per_page"
          class="mb-0"
        />
      </div>

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
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    results: {
      query: gql`
        query results($page: Int) {
          results(page: $page)
            @rest(type: "APIPayload", path: "v2/items?{args}") {
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
      variables() {
        return {
          page: this.$route.query.page || 1,
        }
      },
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
