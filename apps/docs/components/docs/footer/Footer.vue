<script setup lang="ts">
const { t } = useI18n()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="py-6 md:px-8 md:py-0">
    <div
      class="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row"
    >
      <div class="text-center text-sm leading-loose text-muted-foreground">
        <i18n-t keypath="layouts.default.footer.licenseText" tag="span">
          <a
            class="underline"
            href="https://opensource.org/licenses/MIT"
            target="_blank"
          >
            {{ t('layouts.default.footer.licenseName') }}
          </a>
        </i18n-t>
        <br />
        <span>
          {{ t('layouts.default.footer.copyright', { year }) }}
        </span>
      </div>
    </div>
  </footer>
</template>
