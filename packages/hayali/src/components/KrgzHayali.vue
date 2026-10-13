<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { count, increment } = useCounter()
</script>

<template>
  <div data-testid="krgz-hayali">
    <button type="button" @click="increment">
      {{ count }}
    </button>
  </div>
</template>
