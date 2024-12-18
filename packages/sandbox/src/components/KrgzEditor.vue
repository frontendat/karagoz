<script setup lang="ts">
import { LanguageDescription } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { EditorState, Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { computedAsync, useDark, useDebounceFn } from '@vueuse/core'
import { EditorView } from 'codemirror'
import { computed, ref, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'

import { useSandbox } from '../composables/useSandbox.ts'

const props = defineProps<{
  path?: string
}>()

const sandbox = useSandbox()
const contents = ref<string | null>(null)
const isDark = useDark()

watch(
  () => (sandbox.container.value ? props.path : undefined),
  async (path) => {
    if (path === undefined) return // Also ensures that container instance exists.
    const container = sandbox.container.value!
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
  sandbox.container.value?.fs.writeFile(props.path, value, 'utf-8')
}, 300)

const langPack = computedAsync(() =>
  props.path
    ? LanguageDescription.matchFilename(languages, props.path)?.load()
    : undefined,
)

const theme = computed(() => (isDark.value ? oneDark : undefined))

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
