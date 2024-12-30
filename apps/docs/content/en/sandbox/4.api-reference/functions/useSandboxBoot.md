# useSandboxBoot()

```ts
function useSandboxBoot(options?): object
```

A simple composable for convenience to boot a web container and return the promise along with the status.

## Parameters

### options?

`BootOptions`

## Returns

`object`

### boot

```ts
boot: Promise<WebContainer>;
```

### isBooting

```ts
isBooting: Ref<boolean>;
```

## Defined in

[packages/sandbox/src/composables/useSandboxBoot.ts:8](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/composables/useSandboxBoot.ts#L8)
