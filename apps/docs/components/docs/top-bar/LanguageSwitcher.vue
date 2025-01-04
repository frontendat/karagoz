<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <div class="bg-pink-200 gap-4 hidden md:flex">
    <a
      v-for="locale in availableLocales"
      :key="locale.code"
      href="#"
      @click.prevent.stop="setLocale(locale.code)"
    >
      {{ locale.name }}
    </a>
  </div>
</template>
