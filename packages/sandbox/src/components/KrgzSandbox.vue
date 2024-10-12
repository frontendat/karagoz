<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

import { useSharedWebContainer } from '../composables/useSharedWebContainer.ts'
import KrgzExplorer from './KrgzExplorer.vue'

//const selectedPath = defineModel<string | undefined>({ default: undefined })

defineProps<{
  suppressDefaultLayout?: boolean
}>()

const webContainer = useSharedWebContainer()

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
        <KrgzExplorer />
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

<style>
@layer karagoz {
  .krgz-sandbox {
    height: 100%;
  }

  .krgz-sandbox-layout {
    display: grid;
    font-family: Menlo, Monaco, 'Courier New', monospace;
    font-size: 12px;
    gap: 1rem;
    height: 100%;
  }

  .krgz-editor textarea {
    height: 100%;
    width: 100%;
  }

  .krgz-result-frame {
    border: none;
    height: 100%;
    width: 100%;
  }

  /* layout */
  @container sandbox style(--krgz-sandbox-layout: two-cols) {
    .krgz-sandbox-layout {
      grid-template-columns: 1fr 3fr;
    }

    .krgz-result {
      grid-row: span 2;
    }
  }

  @container sandbox style(--krgz-sandbox-layout: three-cols) {
    .krgz-sandbox-layout {
      grid-template-columns: minmax(200px, 250px) 3fr 3fr;
    }
  }

  /* default layout */
  .krgz-sandbox.as-default-layout {
    --krgz-sandbox-layout: stacked;

    container: sandbox / inline-size;

    @media screen and (min-width: 768px) {
      --krgz-sandbox-layout: two-cols;
    }

    @media screen and (min-width: 992px) {
      --krgz-sandbox-layout: three-cols;
    }
  }
}
</style>
