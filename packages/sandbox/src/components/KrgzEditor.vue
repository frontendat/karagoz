<script setup lang="ts">
import { LanguageDescription } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { EditorState, Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { computedAsync, useDebounceFn } from '@vueuse/core'
import { EditorView } from 'codemirror'
import { computed, ref, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'

const props = defineProps<{
  path?: string
}>()

const sandbox = useKaragozSandbox()
const container = sandbox.container()
const contents = ref<string | null>(null)

watch(
  () => props.path,
  async (path) => {
    contents.value = path ? await container.fs.readFile(path, 'utf-8') : ''
    if (path) {
      container.fs.watch(path, async (event) => {
        if (event !== 'change') return
        const newContents = await container.fs.readFile(path, 'utf-8')
        if (newContents !== contents.value) {
          contents.value = newContents
        }
      })
    }
  },
  { immediate: true },
)

const onInput = useDebounceFn((value: string) => {
  if (!props.path) return
  container.fs.writeFile(props.path, value, 'utf-8')
}, 300)

const langPack = computedAsync(() =>
  props.path
    ? LanguageDescription.matchFilename(languages, props.path)?.load()
    : undefined,
)

const theme = computed(() =>
  document.documentElement.classList.contains('dark') ? oneDark : undefined,
)

const extensions = computed(() =>
  [langPack.value, theme.value].filter((ext): ext is Extension => !!ext),
)

// Codemirror EditorView instance ref
const view = shallowRef<EditorView>()
const handleReady = (payload: {
  view: EditorView
  state: EditorState
  container: HTMLDivElement
}) => {
  view.value = payload.view
}

// Status is available at all times via Codemirror EditorView
// const getCodemirrorStates = () => {
//   const state = view.value.state
//   const ranges = state.selection.ranges
//   const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
//   const cursor = ranges[0].anchor
//   const length = state.doc.length
//   const lines = state.doc.lines
//   // more state info ...
//   // return ...
// }

const log = console.log.bind(console)
</script>

<template>
  <div class="h-full overflow-auto w-full">
    <Codemirror
      v-if="contents !== null"
      :model-value="contents"
      placeholder="Code goes here..."
      :style="{ height: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="onInput"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </div>
</template>
