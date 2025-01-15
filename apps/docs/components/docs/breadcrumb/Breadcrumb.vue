<script setup lang="ts">
import { NuxtLink } from '#components'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'

const route = useRouter().currentRoute
const { t } = useI18n()

const fetchBreadcrumb = (): Promise<{ _path: string; title: string }[]> =>
  Promise.all(
    route.value.fullPath
      .split('/')
      .map((_, idx, parts) => parts.slice(0, idx + 1).join('/'))
      .filter((stepPath) => stepPath)
      .map((stepPath) =>
        queryContent(stepPath)
          .only(['_path', 'title'])
          .findOne()
          .then(({ _path, title }) => ({ _path, title }))
          .catch(() => ({
            _path: stepPath,
            title: t(
              `pages${kebabCaseToCamelCase(stepPath.split('/').join('.'))}.title`,
              t('pages.notFound.title'),
            ),
          })),
      ),
  )

const { data: breadcrumb } = useAsyncData(fetchBreadcrumb, {
  watch: () => route.value.fullPath,
})
</script>

<template>
  <Breadcrumb v-if="breadcrumb?.length">
    <BreadcrumbList>
      <template v-for="(step, index) of breadcrumb" :key="breadcrumb._path">
        <BreadcrumbSeparator v-if="index" />
        <BreadcrumbItem>
          <BreadcrumbLink :as="NuxtLink" :to="step._path">
            {{ step.title }}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style scoped></style>
