<script setup lang="ts">
import { NuxtLink } from '#components'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'

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

const { data: breadcrumb } = await useAsyncData(fetchBreadcrumb, {
  watch: [() => route.value.path],
})
</script>

<template>
  <Breadcrumb v-if="breadcrumb?.length">
    <BreadcrumbList>
      <template v-for="(step, index) of breadcrumb" :key="step.path">
        <BreadcrumbSeparator v-if="index" />
        <BreadcrumbItem>
          <BreadcrumbLink :as="NuxtLink" :to="step.path">
            {{ step.title }}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style scoped></style>
