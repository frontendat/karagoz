<script setup lang="ts">
import type {
  DirectoryNode,
  FileNode,
  FileSystemTree,
  WebContainer,
} from '@webcontainer/api'
import { watch } from 'vue'

const props = withDefaults(
  defineProps<{
    container: WebContainer
    path?: string
    tree: FileSystemTree
  }>(),
  { path: '.' },
)

watch(
  () => props.container,
  (value) => {
    if (value) {
      value.fs.readdir(props.path, { withFileTypes: true }).then(console.log)
    }
  },
)

const isDirectory = (tree: DirectoryNode | FileNode): tree is DirectoryNode =>
  Object.prototype.hasOwnProperty.call(tree, 'directory')
</script>

<template>
  <ul v-if="tree" class="krgz-explorer">
    <li v-for="(node, nodeName) in tree" :key="nodeName">
      <a>{{ nodeName }}</a>
      <KrgzExplorer
        v-if="isDirectory(node)"
        :tree="node.directory"
      ></KrgzExplorer>
    </li>
  </ul>
</template>
