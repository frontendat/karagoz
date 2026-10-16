<script setup lang="ts">
import '@karagoz/shared/dist/karagoz-shared.css'
import '@karagoz/sandbox/dist/karagoz-sandbox.css'

import KrgzHayali from './components/KrgzHayali.vue'
import StepBody from './components/StepBody.vue'

// Temporary demo; remove as the lesson implementation progresses.
const demoBody = `## Callouts

Regular **markdown** renders as usual, with [links](https://karagoz.dev) and lists:

- one
- two

:::tip
Use \`:::tip\` for helpful suggestions.
:::

:::warning Careful
Warnings can have a custom title and **rich** content.
:::

:::note
Notes can contain lists:

- first
- second
:::

\`\`\`md
:::tip
Inside a code fence this is not a callout.
:::
\`\`\`

:::unknown
An unregistered kind stays plain text.
:::`
</script>

<template>
  <main>
    <KrgzHayali />
    <StepBody class="m-4 max-w-xl" :body="demoBody" />
  </main>
</template>
