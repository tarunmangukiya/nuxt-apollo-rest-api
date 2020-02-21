<template>
  <div v-if="!$apollo.queries.item.loading" class="container">
    <div class="card" style="width: 18rem;">
      <img :src="item.response.item.urls.png_256" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ item.response.item.name }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    item: {
      query: gql`
        query item($uuid: String) {
          item(uuid: $uuid)
            @rest(type: "APIPayload", path: "v2/items/{args.uuid}/") {
            status
            response @type(name: "ResponsePayload") {
              item @type(name: "Item") {
                id
                uuid
                name
                slug
                price
                urls
              }
            }
          }
        }
      `,
      variables() {
        return {
          uuid: this.$route.params.uuid,
        }
      },
    },
  },
}
</script>
