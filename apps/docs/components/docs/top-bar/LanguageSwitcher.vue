<script setup lang="ts">
import { Languages } from 'lucide-vue-next'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <UiNavigationMenu class="hidden md:flex" viewport-align="end">
    <UiNavigationMenuList>
      <UiNavigationMenuItem>
        <UiNavigationMenuTrigger
          :aria-label="t('layouts.default.topBar.extras.language')"
        >
          <Languages class="h-5 w-5" aria-hidden="true" />
        </UiNavigationMenuTrigger>
        <UiNavigationMenuContent>
          <ul class="grid gap-1 p-2 w-40">
            <li v-for="localeOption in locales" :key="localeOption.code">
              <UiNavigationMenuLink
                as-child
                :active="localeOption.code === locale"
              >
                <NuxtLink
                  class="block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-active:bg-accent/50 data-active:font-medium"
                  :to="switchLocalePath(localeOption.code)"
                  :lang="localeOption.code"
                  :hreflang="localeOption.code"
                  :aria-current="
                    localeOption.code === locale ? 'page' : undefined
                  "
                >
                  {{ localeOption.name }}
                </NuxtLink>
              </UiNavigationMenuLink>
            </li>
          </ul>
        </UiNavigationMenuContent>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
