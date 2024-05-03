<script setup lang="ts">
import { computed, defineModel, watch } from 'vue'

import { KrgzSlideFile } from '../models.ts'

const selectedPath = defineModel<string | undefined>({ default: undefined })

const props = defineProps<{
  fileset: KrgzSlideFile[]
}>()

const displayedFileList = computed(() =>
  props.fileset
    .filter(({ isHidden }) => !isHidden)
    .toSorted((a, b) => (a.path < b.path ? -1 : 1)),
)

watch(
  displayedFileList,
  (fileset) => {
    if (fileset.length) {
      if (!fileset.includes(selectedPath.value)) {
        const file = fileset.find(({ autoFocus }) => autoFocus) ?? fileset.at(0)
        selectedPath.value = file?.path
      }
    }
  },
  { deep: true, immediate: true },
)

const selectedFile = computed(() =>
  props.fileset.find(({ path }) => path === selectedPath.value),
)
</script>

<template>
  <section class="krgz-fileset">
    <slot name="file-list">
      <nav class="krgz-file-list">
        <ul>
          <li v-for="file in displayedFileList" :key="file.path">
            <a
              href="#"
              :class="{ 'is-selected': selectedPath === file.path }"
              @click.prevent="selectedPath = file.path"
              >{{ file.path }}</a
            >
          </li>
        </ul>
      </nav>
    </slot>

    <div class="krgz-editor">
      <slot name="editor">
        <div>
          <pre v-if="selectedFile">{{ selectedFile.code }}</pre>
          <div v-else>No file selected</div>
        </div>
      </slot>
    </div>

    <div class="krgz-result">
      <slot name="result"> result will be shown here </slot>
    </div>
  </section>
</template>

<style scoped>
:where(.krgz-fileset) {
  display: grid;
  gap: 1rem;
  grid-template-columns: 150px 1fr;
}

:where(.krgz-result) {
  grid-column: span 2;
}

pre {
  margin-block: 0;
}

.is-selected {
  color: red;
}
</style>
