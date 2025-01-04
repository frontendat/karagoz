<script setup lang="ts">
/**
 * Content component to render any HTML tag without additional functionality
 * (e.g. rendering a heading without an anchor link).
 *
 * @example
 * :html-tag{tag='h3' content='My Heading'}
 *
 * @example
 * :::html-tag{tag='div'}
 * This will be surrounded with a paragraph element.
 * :::
 */

withDefaults(
  defineProps<{
    /**
     * The tag to render.
     */
    tag: string
    /**
     * Text content. Use instead of slot to avoid getting the rendered markdown content wrapped in a paragraph element.
     */
    content?: string
  }>(),
  { tag: 'div', content: undefined },
)
</script>

<template>
  <component :is="tag">
    <slot>{{ content }}</slot>
  </component>
</template>
