# KrgzProcessTabs

Renders a tabbed list of the running processes or open terminals
and renders the currently focused one using `KrgzProcess`.

This component takes no props and emits no events since it gets all it needs to operate by calling `useSandbox()`.

## Props

| Prop name | Description                                            | Type  | Values | Default |
| --------- | ------------------------------------------------------ | ----- | ------ | ------- |
| mode      | Whether to render running processes or open terminals. | union | -      |         |

---

## Usage

### Running Processes

```vue
<KrgzProcessTabs mode="process" />
```

### Terminals

```vue
<KrgzProcessTabs mode="terminal" />
```

## Defined in

[packages/sandbox/src/components/KrgzProcessTabs.vue](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/components/KrgzProcessTabs.vue)
