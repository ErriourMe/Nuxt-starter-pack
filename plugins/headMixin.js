import Vue from 'vue'

export default ({ route }) => {
  Vue.mixin({
    head() {
      return {
        meta: [
          {
            hid: `og:url`,
            property: 'og:url',
            content: process.env.DOMAIN + route.fullPath,
          },
        ],
      }
    },
  })
}
