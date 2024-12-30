# provideWebContainer()

```ts
function provideWebContainer(webContainerPromise): void
```

Provide the promise resulting from `WebContainer.boot()` to be injected and used by components and composables.

Keep in mind that [only one WebContainer instance can run at a time](https://webcontainers.io/api#%E2%96%B8-boot).
It is the responsibility of the consumer to make sure that the old instance has been torn down before booting another.

## Parameters

### webContainerPromise

`Promise`\<`WebContainer`\>

the promise returned by `WebContainer.boot()`

## Returns

`void`

## Example

```ts
provideWebContainer(WebContainer.boot())
// or
const { boot, isBooting } = useSandboxBoot()
provideWebContainer(boot)
```

## Defined in

[packages/sandbox/src/utils/WebContainer.ts:26](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/utils/WebContainer.ts#L26)
