<script setup lang="ts">
import type { DirectoryNode, FileNode, FileSystemTree } from '@webcontainer/api'

defineProps<{ tree: FileSystemTree }>()

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
