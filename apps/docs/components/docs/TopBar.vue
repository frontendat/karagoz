<script setup lang="ts">
import { Button, KaragozLogo } from '@karagoz/shared'
import { useDark, useToggle } from '@vueuse/core'
import { MoonStar, Sun } from 'lucide-vue-next'

import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header
    class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border"
  >
    <div class="container flex h-14 items-center max-w-screen-2xl">
      <NuxtLink class="flex gap-2 items-center me-6" to="/">
        <KaragozLogo class="h-8" />
        <span class="font-bold">Karagöz</span>
      </NuxtLink>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sandbox</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
              >
                <li class="row-span-5">
                  <NavigationMenuLink as-child>
                    <a
                      class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div class="mb-2 mt-4 text-lg font-medium">
                        Karagöz <br />
                        Sandbox
                      </div>
                      <p class="text-sm leading-tight text-muted-foreground">
                        Bring the power of web containers to your interactive
                        coding demos.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>

                <li>
                  <NavigationMenuLink as-child>
                    <a
                      href="/docs/installation"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        Installation
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                      href="/docs/typography"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        Getting Started
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                      href="/docs/typography"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">Guide</div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                      href="/docs/typography"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        API Reference
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a
                      href="/docs/typography"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">Demos</div>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/docs/introduction"
              :class="navigationMenuTriggerStyle()"
            >
              Blog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div
        class="flex flex-1 items-center justify-between space-x-2 md:justify-end"
      >
        <nav class="flex items-center">
          <Button
            as="a"
            href="https://github.com/frontendat/karagoz"
            size="icon"
            target="_blank"
            variant="ghost"
          >
            <IconGitHub class="size-5" />
          </Button>
          <ClientOnly>
            <Button size="icon" variant="ghost" @click="toggleDark()">
              <Sun v-if="isDark" class="size-5" />
              <MoonStar v-else class="size-5" />
            </Button>
          </ClientOnly>
        </nav>
      </div>
    </div>
  </header>
</template>
