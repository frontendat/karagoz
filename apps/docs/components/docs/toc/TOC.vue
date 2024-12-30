<script setup lang="ts">
const { toc } = useContent()
</script>

<template>
  <div class="sticky top-14">
    <ul v-if="toc && toc.links">
      <li v-for="link in toc.links" :key="link.text">
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
        <ul v-if="link.children?.length" class="ps-2">
          <li v-for="sublink in link.children" :key="sublink.text">
            <a :href="`#${sublink.id}`">
              {{ sublink.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
