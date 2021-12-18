<template>
  <div class="p-5">
    <div class="h1">It's start page, {{ name }}!</div>
    <div>Change it to your code!</div>
    <br />
    <div>
      You can write
      <a href="https://github.com/ErriourRU/Nuxt-starter-pack/issues">here</a>
      if you will have problems.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'John',
    }
  },
}
</script>
