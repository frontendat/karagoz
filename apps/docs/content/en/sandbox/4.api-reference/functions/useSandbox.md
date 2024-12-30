# useSandbox()

```ts
function useSandbox(): object
```

## Returns

`object`

### bootstrap()

```ts
bootstrap: () => Promise<void>;
```

#### Returns

`Promise`\<`void`\>

### container

```ts
container: ComputedRef<null | WebContainer>;
```

### editorTabs

```ts
editorTabs: object;
```

#### editorTabs.close()

```ts
close: (id) => void;
```

##### Parameters

###### id

`string`

##### Returns

`void`

#### editorTabs.current

```ts
current: ComputedRef<
  | undefined
| Tab<EditorTabContext>>;
```

#### editorTabs.findTab()

```ts
findTab: (id) => 
  | undefined
| Tab<EditorTabContext>;
```

##### Parameters

###### id

`string`

##### Returns

  \| `undefined`
  \| [`Tab`](../type-aliases/Tab.md)\<[`EditorTabContext`](../type-aliases/EditorTabContext.md)\>

#### editorTabs.findTabIndex()

```ts
findTabIndex: (id) => number;
```

##### Parameters

###### id

`string`

##### Returns

`number`

#### editorTabs.open()

```ts
open: (id, label?, context?) => void;
```

##### Parameters

###### id

`string`

###### label?

`string`

###### context?

[`EditorTabContext`](../type-aliases/EditorTabContext.md)

##### Returns

`void`

#### editorTabs.tabs

```ts
tabs: ComputedRef<Tab<EditorTabContext>[]>;
```

#### editorTabs.updateContext()

```ts
updateContext: (id, setter) => void;
```

##### Parameters

###### id

`string`

###### setter

(`ctx`) => [`EditorTabContext`](../type-aliases/EditorTabContext.md)

##### Returns

`void`

### explorer

```ts
explorer: object;
```

#### explorer.hidden

```ts
hidden: ComputedRef<Ignore>;
```

#### explorer.readonly

```ts
readonly: ComputedRef<Ignore>;
```

#### explorer.reinstall

```ts
reinstall: ComputedRef<Ignore>;
```

### options

```ts
options: object;
```

#### options.editor

```ts
readonly editor: object;
```

#### options.editor.suppressClose?

```ts
readonly optional suppressClose: boolean;
```

#### options.editor.theme?

```ts
readonly optional theme: object;
```

#### options.editor.theme.dark()?

```ts
readonly optional dark: () => Extension[];
```

##### Returns

`Extension`[]

#### options.editor.theme.light()?

```ts
readonly optional light: () => Extension[];
```

##### Returns

`Extension`[]

#### options.explorer

```ts
readonly explorer: object;
```

#### options.explorer.hidden?

```ts
readonly optional hidden: readonly string[];
```

#### options.explorer.readonly?

```ts
readonly optional readonly: readonly string[];
```

#### options.explorer.reinstall?

```ts
readonly optional reinstall: readonly string[];
```

#### options.preview

```ts
readonly preview: object;
```

#### options.preview.suppressAddressBar?

```ts
readonly optional suppressAddressBar: boolean;
```

#### options.process

```ts
readonly process: object;
```

#### options.process.commands

```ts
readonly commands: object;
```

#### options.process.commands.devServer

```ts
readonly devServer: string;
```

#### options.process.commands.install

```ts
readonly install: string;
```

#### options.process.commands.terminal

```ts
readonly terminal: string;
```

#### options.process.packageManager

```ts
readonly packageManager: "npm" | "pnpm" | "yarn";
```

#### options.process.starters?

```ts
readonly optional starters: object;
```

#### options.process.starters.devServer()?

```ts
readonly optional devServer: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

#### options.process.starters.install()?

```ts
readonly optional install: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

#### options.process.starters.terminal()?

```ts
readonly optional terminal: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

#### options.terminal

```ts
readonly terminal: object;
```

#### options.terminal.maxCount?

```ts
readonly optional maxCount: number;
```

#### options.terminal.theme?

```ts
readonly optional theme: object;
```

#### options.terminal.theme.dark()?

```ts
readonly optional dark: () => ITheme;
```

##### Returns

`ITheme`

#### options.terminal.theme.light()?

```ts
readonly optional light: () => ITheme;
```

##### Returns

`ITheme`

### preview

```ts
preview: object;
```

#### preview.frame

```ts
frame: Ref<undefined | HTMLIFrameElement> = previewFrame;
```

#### preview.reload()

```ts
reload: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

#### preview.suppressAddressBar

```ts
suppressAddressBar: ComputedRef<undefined | boolean>;
```

#### preview.url

```ts
url: ComputedRef<string>;
```

### processTabs

```ts
processTabs: object;
```

#### processTabs.availableTerminals

```ts
availableTerminals: ComputedRef<number>;
```

#### processTabs.close()

```ts
close: (id) => void;
```

##### Parameters

###### id

`string`

##### Returns

`void`

#### processTabs.current

```ts
current: ComputedRef<
  | undefined
| Tab<ProcessTabContext>>;
```

#### processTabs.findTab()

```ts
findTab: (id) => 
  | undefined
| Tab<ProcessTabContext>;
```

##### Parameters

###### id

`string`

##### Returns

  \| `undefined`
  \| [`Tab`](../type-aliases/Tab.md)\<[`ProcessTabContext`](../type-aliases/ProcessTabContext.md)\>

#### processTabs.findTabIndex()

```ts
findTabIndex: (id) => number;
```

##### Parameters

###### id

`string`

##### Returns

`number`

#### processTabs.kill()

```ts
kill: (id) => void;
```

##### Parameters

###### id

`string`

##### Returns

`void`

#### processTabs.open()

```ts
open: (id, label?, context?) => Promise<void>;
```

##### Parameters

###### id

`string`

###### label?

`string`

###### context?

[`ProcessTabContext`](../type-aliases/ProcessTabContext.md)

##### Returns

`Promise`\<`void`\>

#### processTabs.restart()

```ts
restart: (id) => Promise<void>;
```

##### Parameters

###### id

`string`

##### Returns

`Promise`\<`void`\>

#### processTabs.tabs

```ts
tabs: ComputedRef<Tab<ProcessTabContext>[]>;
```

#### processTabs.updateContext()

```ts
updateContext: (id, setter) => void;
```

##### Parameters

###### id

`string`

###### setter

(`ctx`) => [`ProcessTabContext`](../type-aliases/ProcessTabContext.md)

##### Returns

`void`

### setOption()

```ts
setOption: <K, T>(key, newValueOrSetter) => void;
```

#### Type Parameters

• **K** *extends* keyof [`SandboxOptions`](../type-aliases/SandboxOptions.md)

• **T** *extends* 
  \| \{
  `suppressClose`: `boolean`;
  `theme`: \{
     `dark`: () => `Extension`[];
     `light`: () => `Extension`[];
    \};
 \}
  \| \{
  `hidden`: `string`[];
  `readonly`: `string`[];
  `reinstall`: `string`[];
 \}
  \| \{
  `suppressAddressBar`: `boolean`;
 \}
  \| \{
  `commands`: \{
     `devServer`: `string`;
     `install`: `string`;
     `terminal`: `string`;
    \};
  `packageManager`: `"npm"` \| `"pnpm"` \| `"yarn"`;
  `starters`: \{
     `devServer`: () => `Promise`\<`void`\>;
     `install`: () => `Promise`\<`void`\>;
     `terminal`: () => `Promise`\<`void`\>;
    \};
 \}
  \| \{
  `maxCount`: `number`;
  `theme`: \{
     `dark`: () => `ITheme`;
     `light`: () => `ITheme`;
    \};
 \}

#### Parameters

##### key

`K`

##### newValueOrSetter

`T` | (`oldValue`) => `T`

#### Returns

`void`

### setPackageManager()

```ts
setPackageManager: (pm) => void;
```

#### Parameters

##### pm

`"npm"` | `"pnpm"` | `"yarn"`

#### Returns

`void`

## Defined in

[packages/sandbox/src/composables/useSandbox.ts:189](https://github.com/frontendat/karagoz/blob/2ed8a18477b67dcd686f6dbd2423b5cb094dd530/packages/sandbox/src/composables/useSandbox.ts#L189)
