<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="bg-pink-200 gap-4 hidden md:flex">
    <a
      v-for="localeOption in availableLocales"
      :key="localeOption.code"
      href="#"
      @click.prevent.stop="setLocale(localeOption.code)"
    >
      {{ localeOption.name }}
    </a>
  </div>
</template>
