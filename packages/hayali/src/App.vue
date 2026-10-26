<script setup lang="ts">
import { ref } from 'vue'
import DefaultExample from './examples/DefaultExample.vue'
import ParserExample from './examples/ParserExample.vue'

const examples = new Map([
  ['Default', DefaultExample],
  ['Parser', ParserExample],
])

const selectedExample = ref<'Default' | 'Parser'>('Default')
</script>

<template>
  <div class="mt-8 mx-8">
    Example:
    <label>
      <input type="radio" v-model="selectedExample" value="Default" /> Default
    </label>
    <label>
      <input type="radio" v-model="selectedExample" value="Parser" /> Parser
    </label>
  </div>
  <div class="mt-4 mx-4">
    <div class="border-4 border-dashed flex-1 m-8">
      <div class="h-180">
        <component :is="examples.get(selectedExample)" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 700px;
}
</style>
