<script setup lang="ts">
import { fallbackTitleKey } from '~/utils/fallbackTitleKey'

const { t } = useI18n()
const route = useRouter().currentRoute
const pathParts = computed(() => route.value.path.split('/'))

const titleKey = computed(() => fallbackTitleKey(pathParts.value))

const queryLocalisedCollectionNavigation = useLocalisedCollectionNavigation()

const { data: result } = await useAsyncData(() =>
  queryLocalisedCollectionNavigation((builder) =>
    builder.where('path', 'LIKE', `${route.value.path}%`),
  ),
)

const list = computed(() => {
  let current = result.value
  for (let i = 0; i < pathParts.value.length - 1; i++) {
    current = current?.[0]?.children
  }
  return current
})
</script>

<template>
  <div>
    <h1>{{ t(titleKey, t('pages.notFound.title')) }}</h1>

    <template v-if="list?.length">
      <p>
        {{ t('pages.notFound.content') }}
      </p>
      <ul>
        <li v-for="item in list" :key="item.path">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </template>

    <p v-else>
      {{ t('pages.notFound.noContent') }}
    </p>
  </div>
</template>
