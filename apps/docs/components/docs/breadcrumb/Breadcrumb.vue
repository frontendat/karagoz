<script setup lang="ts">
import { NuxtLink } from '#components'

const { t } = useI18n()
const route = useRouter().currentRoute
const queryLocalisedCollection = useLocalisedCollection()

const fetchBreadcrumb = () => {
  return Promise.all(
    route.value.path
      .split('/')
      .map((_, idx, parts) => parts.slice(0, idx + 1).join('/'))
      .filter((stepPath) => stepPath)
      .map((stepPath) =>
        queryLocalisedCollection((builder) =>
          builder
            .path(stepPath)
            .select('path', 'title')
            .first()
            .then((item) => ({
              path: item?.path ?? stepPath,
              title:
                item?.title ??
                t(
                  `pages${kebabCaseToCamelCase(stepPath.split('/').join('.'))}.title`,
                  t('pages.notFound.title'),
                ),
            })),
        ),
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
          <UiBreadcrumbLink :as="NuxtLink" :to="step.path">
            {{ step.title }}
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>

<style scoped></style>
