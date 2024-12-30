<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const props = withDefaults(
  defineProps<{
    items: NavItem[]
    initLevel?: number
    level?: number
    maxLevel?: number
  }>(),
  {
    initLevel: 0,
    level: 0,
    maxLevel: Infinity,
  },
)

const levelItems = computed(() => {
  if (props.level) return props.items
  let items: NavItem[] | undefined = props.items
  for (let i = 0; i < props.initLevel; i++) {
    items = items?.at(0)?.children
  }
  return items ?? []
})
</script>

<template>
  <ul v-if="levelItems.length" :style="{ '--sidebar-level': level }">
    <li v-for="item of levelItems" :key="item._path">
      <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
      <DocsSideBarLevel
        v-if="item.children && level < maxLevel - 1"
        :items="item.children"
        :level="level + 1"
        :max-level="maxLevel"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding-inline-start: calc(0.5rem * var(--sidebar-level, 0));
}
</style>
