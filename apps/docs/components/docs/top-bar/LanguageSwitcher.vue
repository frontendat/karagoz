<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="bg-pink-200 gap-4 hidden md:flex">
    <NuxtLink
      v-for="localeOption in availableLocales"
      :key="localeOption.code"
      :to="switchLocalePath(localeOption.code)"
    >
      {{ localeOption.name }}
    </NuxtLink>
  </div>
</template>
