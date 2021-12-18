<template>
  <svg class="icon">
    <use :xlink:href="`/static/sprites/${sprite}.svg#i-${name}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    sprite: {
      type: String,
      required: false,
      default: 'main',
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
