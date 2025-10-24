<script setup></script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import Register from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Register
  }
}
</script>

<style scoped></style>
