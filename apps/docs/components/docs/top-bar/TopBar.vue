<script setup lang="ts">
import { Button, KaragozLogo } from '@karagoz/shared'
import { useDark, useToggle } from '@vueuse/core'
import { MoonStar, Sun } from 'lucide-vue-next'

import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu'

const { t } = useI18n()
const localePath = useLocalePath()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isDev = import.meta.dev
</script>

<template>
  <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b">
    <div
      class="container flex h-14 items-center max-w-384 mx-auto px-4 md:px-8"
    >
      <DocsTopBarMobileNav class="md:hidden" />
      <NuxtLink class="flex gap-2 items-center me-6" :to="localePath('/')">
        <KaragozLogo
          aria-hidden="true"
          class="fill-primary h-8"
          :title="t('layouts.siteName')"
        />
        <span class="font-bold hidden md:block">{{
          t('layouts.siteName')
        }}</span>
      </NuxtLink>
      <UiNavigationMenu class="max-md:hidden">
        <UiNavigationMenuList>
          <UiNavigationMenuItem
            v-for="section in docsNavSections"
            :key="section.id"
          >
            <UiNavigationMenuTrigger>{{
              t(section.label)
            }}</UiNavigationMenuTrigger>
            <UiNavigationMenuContent>
              <ul
                class="grid gap-3 p-6 md:w-100 lg:w-125 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
              >
                <li class="row-span-5">
                  <UiNavigationMenuLink as-child>
                    <NuxtLink
                      class="flex h-full w-full select-none flex-col justify-end rounded-md bg-muted p-4 no-underline outline-none focus:shadow-md"
                      :to="localePath({ path: section.base })"
                    >
                      <div class="mb-2 mt-4 text-lg font-medium">
                        {{ t('layouts.siteName') }} <br />
                        {{ t(section.label) }}
                      </div>
                      <p class="text-xs leading-tight text-muted-foreground">
                        {{ t(section.teaser) }}
                      </p>
                    </NuxtLink>
                  </UiNavigationMenuLink>
                </li>
                <li v-for="link in section.links" :key="link.path">
                  <UiNavigationMenuLink as-child>
                    <NuxtLink
                      :to="localePath({ path: link.path })"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        {{ t(link.label) }}
                      </div>
                    </NuxtLink>
                  </UiNavigationMenuLink>
                </li>
              </ul>
            </UiNavigationMenuContent>
          </UiNavigationMenuItem>
        </UiNavigationMenuList>
      </UiNavigationMenu>
      <div class="flex flex-1 items-center justify-end md:space-x-2">
        <DocsTopBarLanguageSwitcher />
        <nav class="flex items-center">
          <Button
            as="a"
            :aria-label="t('layouts.default.topBar.extras.github')"
            href="https://github.com/frontendat/karagoz"
            size="icon"
            target="_blank"
            :title="t('layouts.default.topBar.extras.github')"
            variant="ghost"
          >
            <IconGitHub class="size-5" />
          </Button>
          <ClientOnly>
            <Button
              :aria-label="
                isDark
                  ? t('layouts.default.topBar.extras.switchToLightTheme')
                  : t('layouts.default.topBar.extras.switchToDarkTheme')
              "
              size="icon"
              :title="
                isDark
                  ? t('layouts.default.topBar.extras.switchToLightTheme')
                  : t('layouts.default.topBar.extras.switchToDarkTheme')
              "
              variant="ghost"
              @click="toggleDark()"
            >
              <Sun v-if="isDark" class="size-5" />
              <MoonStar v-else class="size-5" />
            </Button>
          </ClientOnly>
        </nav>
      </div>
    </div>
  </header>
</template>
