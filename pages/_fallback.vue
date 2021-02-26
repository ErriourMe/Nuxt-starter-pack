<template>
  <div>Falled back</div>
</template>

<script>
export default {
  /* $axios, params, app, error */
  async asyncData({ error }) {
    await error({ statusCode: 404 })
  },
}
</script>
