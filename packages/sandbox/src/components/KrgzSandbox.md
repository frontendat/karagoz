### Basic Usage

```vue
<script setup lang="ts">
const { boot, isBooting } = useSandboxBoot()
  
// ... bootstrapping and mounting files
</script>

<template>
  <KrgzSandbox :booting="isBooting" @solve="onSolveClick()" />
</template>
```

### Usage with props

```vue
<script setup lang="ts">
  const { boot, isBooting } = useSandboxBoot()

  // ... bootstrapping and mounting files
</script>

<template>
  <KrgzSandbox 
    :booting="isBooting"
    hide-explorer 
    hide-solve-button 
    hide-theme-toggle
    :available-panels="['code', 'processes', 'result', 'terminal']"
    :shown-panels="['code', 'processes', 'result', 'terminal']"
  />
</template>
```

### Replacing panel components using slots

```vue
<script setup lang="ts">
  const { boot, isBooting } = useSandboxBoot()

  // ... bootstrapping and mounting files
</script>

<template>
  <KrgzSandbox>
    <template #editor>
      <!-- fallback: <KrgzEditorTabs> -->
      <MyCustomEditor />
    </template>
    <template #explorer>
      <!-- fallback: <KrgzExplorer> -->
      <MyCustomExplorer />
    </template>
    <template #preview>
      <!-- fallback: <KrgzPreview> -->
      <MyCustomPreview />
    </template>
    <template #processes>
      <!-- fallback: <KrgzProcessTabs mode="process"> -->
      <MyCustomProcesses />
    </template>
    <template #terminal>
      <!-- fallback: <KrgzProcessTabs mode="terminal"> -->
      <MyCustomTerminal />
    </template>
  </KrgzSandbox>
</template>
```