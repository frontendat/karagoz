<script setup lang="ts">
import { type FileSystemTree, WebContainer } from '@webcontainer/api'
import { onMounted, ref } from 'vue'

import KrgzExplorer from './KrgzExplorer.vue'

//const selectedPath = defineModel<string | undefined>({ default: undefined })

const props = defineProps<{
  tree: FileSystemTree
}>()

const previewUrl = ref<string>()

onMounted(async () => {
  const container = await WebContainer.boot()

  container.mount(props.tree)

  const existCode = await installDeps()
  if (existCode !== 0) {
    throw new Error('Installation failed')
  }
  startDevServer()

  async function installDeps() {
    const installProcess = await container.spawn('npm', ['install'])
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
    await container.spawn('npm', ['run', 'start'])
    container.on('server-ready', (_, url) => {
      previewUrl.value = url
    })
  }
})
</script>

<template>
  <section class="krgz-tree">
    <slot name="file-list">
      <KrgzExplorer :tree="tree" />
    </slot>

    <div class="krgz-editor">
      <slot name="editor">
        <div>
          <textarea>code here</textarea>
        </div>
      </slot>
    </div>

    <div class="krgz-result">
      <slot name="result">
        <iframe :src="previewUrl"></iframe>
      </slot>
    </div>
  </section>
</template>

<style scoped>
:where(.krgz-tree) {
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
