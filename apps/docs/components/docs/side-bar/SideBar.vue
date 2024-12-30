<script setup lang="ts">
const route = useRouter().currentRoute

const pathParts = computed(() => route.value.path.split('/').slice(0, 3))

const topQuery = computed(() =>
  2 <= pathParts.value.length
    ? queryContent(pathParts.value.slice(0, 2).join('/'))
    : undefined,
)

const bottomQuery = computed(() =>
  3 === pathParts.value.length
    ? queryContent(pathParts.value.join('/')).where({
        _id: { $not: { $regex: /index.md$/ } },
      })
    : undefined,
)
</script>

<template>
  <nav class="text-sm">
    <ContentNavigation
      v-if="topQuery"
      v-slot="{ navigation }"
      :key="pathParts.slice(0, 2).join('/')"
      :query="topQuery"
    >
      <DocsSideBarLevel :items="navigation" :init-level="1" :max-level="1" />
    </ContentNavigation>
    <ContentNavigation
      v-if="bottomQuery"
      v-slot="{ navigation }"
      :key="pathParts.join('/')"
      :query="bottomQuery"
    >
      <DocsSideBarLevel
        class="border-t mt-4 pt-4"
        :init-level="2"
        :items="navigation"
      />
    </ContentNavigation>
  </nav>
</template>
