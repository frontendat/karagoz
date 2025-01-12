<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const props = withDefaults(
  defineProps<{
    items: NavItem[]
    initLevel?: number
    level?: number
    maxLevel?: number
    title?: string
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
    <li v-if="title">
      <div class="block font-bold px-2 py-1">
        {{ title }}
      </div>
    </li>
    <li v-for="item of levelItems" :key="item._path">
      <div class="item">
        <NuxtLink
          class="block px-2 py-1 hover:underline text-muted-foreground"
          :to="item._path"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
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
.item {
  padding-inline-start: calc(1rem * var(--sidebar-level, 0));
}

.item:has(> .router-link-active) {
  background: hsl(var(--secondary));
}

.router-link-active {
  color: hsl(var(--secondary-foreground));
}
</style>
