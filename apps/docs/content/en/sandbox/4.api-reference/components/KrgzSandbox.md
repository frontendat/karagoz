# KrgzSandbox

Main sandbox component.

This component provides the default layout, renders shown panels, available panel toggles and additional buttons.

It renders the provided panels in slots to allow exchanging them for more flexibility.

The panels usually get all they need through `useSandbox()`, but this component takes a few props due to its
presentational nature.

## Models

| Prop name       | Description       | Type  | Values                            | Default                           |
| --------------- | ----------------- | ----- | --------------------------------- | --------------------------------- |
| availablePanels | Toggles to render | Array | code, processes, result, terminal | code, processes, result, terminal |
| shownPanels     | Shown panels      | Array | code, processes, result, terminal | code, result                      |

## Props

| Prop name            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Type    | Values | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| booting              | Show loading indicator. Important to pass it to not render panels before the web container is ready.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | boolean | -      |         |
| hideExplorer         | Hide file explorer (e.g. to only show a specific set of editor tabs).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | boolean | -      |         |
| hideFullScreenToggle | Hide fullscreen toggle.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | boolean | -      |         |
| hideSolveButton      | Hide the solve button if it is not needed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | boolean | -      |         |
| hideThemeToggle      | Hide the dark/light theme toggle.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | boolean | -      |         |
| multiPanelFrom       | Forces only 1 panel to be shown at a time depending on container width.<br/>The value determines the minimum container width to allow showing multiple panels, for that<br/>[tailwindcss-container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries?tab=readme-ov-file#configuration) is used.<br/>The additional value `none` enforces only 1 panel regardless of container width.<br/>If no value is provided, then showing multiple panels is always allowed.<br/>In single-panel mode the first panel from `shown-panels is initially shown.<br/>**Available values:** none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl | union   | -      |         |

## Events

| Event name | Properties | Description                               |
| ---------- | ---------- | ----------------------------------------- |
| solve      |            | Emitted when the solve button is clicked. |

## Slots

| Name      | Description                                     | Bindings |
| --------- | ----------------------------------------------- | -------- |
| explorer  | slot to render file explorer                    |          |
| editor    | slot to render file editor tabs and code editor |          |
| terminal  | slot to render open terminal tabs               |          |
| preview   | slot to render result preview iframe            |          |
| processes | slot to render running process tabs             |          |

---

## Usage

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

## Defined in

[packages/sandbox/src/components/KrgzSandbox.vue](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/components/KrgzSandbox.vue)
