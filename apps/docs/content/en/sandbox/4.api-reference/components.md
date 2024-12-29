# KrgzEditorTabs

> Renders a tabbed list of the open files and the editor of the currently focused tab.

This component takes no props and emits no events since it gets all it needs to operate by calling `useSandbox()`.

---

```vue live
<KrgzEditorTabs />
```
# KrgzExplorer

> Renders the file explorer.

This component reads and renders the contents of the current working directory, as well as, any expanded directory
by recursively using the internal components `KrgzExplorerEntity` and `KrgzExplorerSubdir`.

It initially renders a loading indicator until contents of the directory have been read.

It takes no props and emits no events since it gets all that it needs to operate by calling `useSandbox()`.

---

```vue live
<KrgzExplorer />
```
# KrgzPreview

> Renders the result preview iframe and, if enabled, an address bar showing the current URL of the preview.

This component takes no props and emits no events since it gets all it needs to operate by calling `useSandbox()`.

---

```vue live
<KrgzPreview />
```
# KrgzProcessTabs

> Renders a tabbed list of the running processes or open terminals
> and renders the currently focused one using `KrgzProcess`.

This component takes no props and emits no events since it gets all it needs to operate by calling `useSandbox()`.

## Props

| Prop name | Description                                            | Type  | Values | Default |
| --------- | ------------------------------------------------------ | ----- | ------ | ------- |
| mode      | Whether to render running processes or open terminals. | union | -      |         |

---

```vue live
<KrgzProcessTabs :mode="Default Example Usage" />
```
# KrgzSandbox

> Main sandbox component.

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

| Prop name       | Description                                                                                          | Type    | Values | Default |
| --------------- | ---------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| booting         | Show loading indicator. Important to pass it to not render panels before the web container is ready. | boolean | -      |         |
| hideExplorer    | Hide file explorer (e.g. to only show a specific set of editor tabs).                                | boolean | -      |         |
| hideSolveButton | Hide the solve button if it is not needed.                                                           | boolean | -      |         |
| hideThemeToggle | Hide the dark/light theme toggle.                                                                    | boolean | -      |         |

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

<a href="https://github.com/vue-styleguidist/vue-styleguidist/edit/dev/examples/docgen/src/components/KrgzSandbox.md" class="docgen-edit-link">edit on github</a>

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
