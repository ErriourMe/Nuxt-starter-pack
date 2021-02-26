<template>
  <div class="container py-5">
    <div
      class="d-flex flex-column align-items-center justify-content-center h-100 py-5"
    >
      <h1 class="text-primary">{{ error.statusCode }}</h1>
      <div class="text-primary">{{ $t(`error.${error.statusCode}`) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
