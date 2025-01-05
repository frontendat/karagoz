<script setup lang="ts">
import { LanguageDescription } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { EditorState, Extension } from '@codemirror/state'
import { computedAsync, useDark, useDebounceFn } from '@vueuse/core'
import { EditorView } from 'codemirror'
import { computed, ref, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'

import { useSandbox } from '../composables'
import { codemirrorDefaultTheme } from '../utils/codemirror.ts'

/**
 * Renders CodeMirror to edit the currently focused file in the editor tabs.
 */
defineOptions({})

const props = defineProps<{
  /**
   * Disable editor and prevent editing. Used for readonly files.
   */
  disabled?: boolean
  /**
   * Path of the file being edited.
   */
  path?: string
}>()

const emit = defineEmits<{
  /**
   * When the editor cannot read the file contents (e.g. file does not exist or has been deleted)
   * a close event is emitted to close the editor tab.
   * @param {string} path file path to close
   */
  (e: 'close', path: string): void
}>()

const sandbox = useSandbox()
const contents = ref<string | null>(null)
const isDark = useDark()

watch(
  () => (sandbox.container.value ? props.path : undefined),
  async (path) => {
    if (path === undefined) return // Also ensures that container instance exists.
    const container = sandbox.container.value!
    contents.value = path
      ? await container.fs.readFile(path, 'utf-8').catch(() => {
          emit('close', path)
          return ''
        })
      : ''
    const watcher = container.fs.watch(path, async (event) => {
      if (event !== 'change') return
      const newContents = await container.fs.readFile(path, 'utf-8')
      if (newContents !== contents.value) {
        contents.value = newContents
      }
    })

    return () => watcher.close()
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

const themeKey = computed(() => (isDark.value ? 'dark' : 'light'))

const theme = computed(
  () =>
    sandbox.options.editor.theme?.[themeKey.value]?.() ??
    codemirrorDefaultTheme[themeKey.value],
)

const extensions = computed(() =>
  [langPack.value, ...theme.value].filter((ext): ext is Extension => !!ext),
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
</script>

<template>
  <div class="h-full overflow-auto text-[13px] w-full">
    <Codemirror
      v-if="contents !== null"
      :model-value="contents"
      :disabled="disabled"
      placeholder="Code goes here..."
      :style="{ height: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="onInput"
    />
  </div>
</template>
