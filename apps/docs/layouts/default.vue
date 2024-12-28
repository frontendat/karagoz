<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead()
const title = computed(() =>
  route.meta.title
    ? t(route.meta.title?.toString() ?? 'TBD', t('layouts.title'))
    : t('layouts.title'),
)
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <Title>{{ title }} | {{ t('layouts.siteName') }}</Title>
        <template v-for="link in head.link" :key="link.hid">
          <Link
            :id="link.hid"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.hid">
          <Meta
            :id="meta.hid"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <div class="min-h-full">
          <DocsTopBar />
          <slot></slot>
        </div>
      </Body>
    </Html>
  </div>
</template>
