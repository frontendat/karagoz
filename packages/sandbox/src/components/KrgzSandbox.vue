<script setup lang="ts">
import { type FileSystemTree } from '@webcontainer/api'
import { onBeforeUnmount, watch } from 'vue'

import { useWebContainer } from '../composables/useWebContainer.ts'
import KrgzExplorer from './KrgzExplorer.vue'

//const selectedPath = defineModel<string | undefined>({ default: undefined })

const props = defineProps<{
  suppressDefaultLayout?: boolean
  tree: FileSystemTree
}>()

const webContainer = useWebContainer()

watch(
  () => props.tree,
  async (value, oldValue) => {
    const shouldReinstall =
      value['package.json'] &&
      value['package.json'] !== oldValue?.['package.json']
    await webContainer.mount(value, { shouldReinstall })
  },
  { deep: true, immediate: true },
)

watch(
  () => webContainer.previewUrl.value,
  (v) => console.log(v),
  { immediate: true },
)

onBeforeUnmount(() => webContainer.ensureInstance().then((c) => c.teardown()))
</script>

<template>
  <section
    class="krgz-sandbox"
    :class="{ 'as-default-layout': !suppressDefaultLayout }"
  >
    <div class="krgz-sandbox-layout">
      <slot name="explorer">
        <KrgzExplorer :tree="tree" />
      </slot>

      <div class="krgz-editor">
        <slot name="editor">
          <textarea>code here</textarea>
        </slot>
      </div>

      <div class="krgz-result">
        <iframe
          v-if="webContainer.previewUrl.value"
          :src="webContainer.previewUrl.value"
          class="krgz-result-frame"
        ></iframe>
        <div v-else>Initialising...</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* styles */

:where(.krgz-sandbox) {
  height: 100%;
}

:where(.krgz-sandbox-layout) {
  display: grid;
  font-family: Menlo, Monaco, 'Courier New', monospace;
  font-size: 12px;
  gap: 1rem;
  height: 100%;
}

:where(.krgz-editor textarea) {
  height: 100%;
  width: 100%;
}

:where(.krgz-result-frame) {
  border: none;
  height: 100%;
  width: 100%;
}

/* layout */

@container sandbox style(--krgz-sandbox-layout: two-cols) {
  :where(.krgz-sandbox-layout) {
    grid-template-columns: 1fr 3fr;
  }

  :where(.krgz-result) {
    grid-row: span 2;
  }
}

@container sandbox style(--krgz-sandbox-layout: three-cols) {
  :where(.krgz-sandbox-layout) {
    grid-template-columns: minmax(200px, 250px) 3fr 3fr;
  }
}

/* default layout */

:where(.krgz-sandbox.as-default-layout) {
  --krgz-sandbox-layout: stacked;

  container: sandbox / inline-size;

  @media screen and (min-width: 768px) {
    --krgz-sandbox-layout: two-cols;
  }

  @media screen and (min-width: 992px) {
    --krgz-sandbox-layout: three-cols;
  }
}
</style>
