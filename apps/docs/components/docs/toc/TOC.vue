<script setup lang="ts">
import type { Toc } from '@nuxt/content'

defineProps<{
  noTitle?: boolean
  toc: Toc
}>()

const { t } = useI18n()
</script>

<template>
  <div class="space-y-2">
    <p v-if="!noTitle" class="font-medium">{{ t('layouts.tocTitle') }}</p>
    <ul v-if="toc && toc.links" class="m-0 list-none">
      <li v-for="link in toc.links" :key="link.text" class="pt-2">
        <a
          :href="`#${link.id}`"
          class="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children?.length" class="m-0 list-none pl-4">
          <li v-for="sublink in link.children" :key="sublink.text" class="pt-2">
            <a
              :href="`#${sublink.id}`"
              class="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
            >
              {{ sublink.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
