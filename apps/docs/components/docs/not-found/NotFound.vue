<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content'

const { t } = useI18n()
const route = useRouter().currentRoute
const pathParts = computed(() => route.value.path.split('/'))

const titleKey = computed(
  () =>
    `pages${pathParts.value.join('.').replaceAll(/(-+)([a-z])/g, (_, __, char) => char.toUpperCase())}.title`,
)

const query: QueryBuilderParams = {
  only: ['title', '_path'],
}
</script>

<template>
  <div class="prose">
    <h1>{{ t(titleKey, t('pages.notFound.title')) }}</h1>

    <ContentList :key="route.path" :path="route.path" :query="query">
      <template #default="{ list }">
        <p>
          {{ t('pages.notFound.content') }}
        </p>
        <ul>
          <li v-for="item in list" :key="item._path">
            <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
          </li>
        </ul>
      </template>

      <template #not-found>
        <p>
          {{ t('pages.notFound.noContent') }}
        </p>
      </template>
    </ContentList>
  </div>
</template>
