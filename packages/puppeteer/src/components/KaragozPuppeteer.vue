<script setup lang="ts">
import {ref} from "vue";

const count = ref(0)
</script>

<template>
  <div>Puppeteer works
    <button @click="count--">-</button>
    {{ count }}
    <button @click="count++">+</button>
  </div>
</template>

<style scoped>

</style>