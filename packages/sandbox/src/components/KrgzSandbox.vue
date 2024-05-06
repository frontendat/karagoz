<script setup lang="ts">
import {
  type FileSystemTree,
  WebContainer,
  WebContainerProcess,
} from '@webcontainer/api'
import { onBeforeUnmount, ref, watch } from 'vue'

import KrgzExplorer from './KrgzExplorer.vue'

//const selectedPath = defineModel<string | undefined>({ default: undefined })

const props = defineProps<{
  suppressDefaultLayout?: boolean
  tree: FileSystemTree
}>()

const container = ref<WebContainer>()
const runningProcesses = new Map<string, WebContainerProcess>()
const processKeys = {
  install: 'install',
  devServer: 'devServer',
} as const
const previewUrl = ref<string>()

watch(
  () => props.tree,
  async (value, oldValue) => {
    if (!container.value) {
      container.value = await WebContainer.boot()
    }

    container.value.mount(props.tree)

    const shouldReinstall =
      value['package.json'] &&
      value['package.json'] !== oldValue?.['package.json']

    if (shouldReinstall) {
      runningProcesses.get(processKeys.install)?.kill()
      runningProcesses.get(processKeys.devServer)?.kill()

      const existCode = await installDeps()
      if (existCode !== 0) {
        throw new Error('Installation failed')
      }

      await startDevServer()
    }
  },
  { deep: true, immediate: true },
)

onBeforeUnmount(() => container.value?.teardown())

async function installDeps() {
  const installProcess = await container.value?.spawn('npm', ['install'])
  runningProcesses.set(processKeys.install, installProcess)
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data)
      },
    }),
  )
  return installProcess.exit
}

async function startDevServer() {
  const devServerProcess = await container.value.spawn('npm', ['run', 'start'])
  runningProcesses.set(processKeys.devServer, devServerProcess)
  devServerProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data)
      },
    }),
  )
  container.value.on('server-ready', (_, url) => {
    previewUrl.value = url
  })
}
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
          v-if="previewUrl"
          :src="previewUrl"
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
    grid-template-columns: 1fr 2fr 2fr;
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
