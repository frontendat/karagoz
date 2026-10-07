<script setup lang="ts">
import { NuxtLink } from '#components'

const { t } = useI18n()
const route = useRouter().currentRoute
const contentPath = useContentPath()
const localePath = useLocalePath()
const queryLocalisedCollection = useLocalisedCollection()

const fetchBreadcrumb = () => {
  return Promise.all(
    contentPath.value
      .split('/')
      .map((_, idx, parts) => parts.slice(0, idx + 1).join('/'))
      .filter((stepPath) => stepPath)
      .map((stepPath) =>
        // Map outside the query handler so a missing translation stays `null`
        // and the default-locale fallback kicks in.
        queryLocalisedCollection((builder) =>
          builder.path(stepPath).select('path', 'title').first(),
        ).then((item) => ({
          path: item?.path ?? stepPath,
          title:
            item?.title ??
            t(
              `pages${kebabCaseToCamelCase(stepPath.split('/').join('.'))}.title`,
              t('pages.notFound.title'),
            ),
        })),
      ),
  )
}

const { data: breadcrumb } = await useAsyncData(
  () => `breadcrumb-${route.value.path}`,
  fetchBreadcrumb,
)
</script>

<template>
  <UiBreadcrumb v-if="breadcrumb?.length">
    <UiBreadcrumbList>
      <template v-for="(step, index) of breadcrumb" :key="step.path">
        <UiBreadcrumbSeparator v-if="index" />
        <UiBreadcrumbItem>
          <UiBreadcrumbLink :as="NuxtLink" :to="localePath(step.path)">
            {{ step.title }}
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>

<style scoped></style>
