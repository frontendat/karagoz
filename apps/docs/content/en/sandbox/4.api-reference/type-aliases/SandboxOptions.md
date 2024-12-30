# SandboxOptions

```ts
type SandboxOptions = object;
```

## Type declaration

### editor

```ts
editor: object;
```

Editor related options.

#### editor.suppressClose?

```ts
optional suppressClose: boolean;
```

#### editor.theme?

```ts
optional theme: object;
```

#### editor.theme.dark()?

```ts
optional dark: () => Extension[];
```

##### Returns

`Extension`[]

#### editor.theme.light()?

```ts
optional light: () => Extension[];
```

##### Returns

`Extension`[]

### explorer

```ts
explorer: object;
```

#### explorer.hidden?

```ts
optional hidden: string[];
```

#### explorer.readonly?

```ts
optional readonly: string[];
```

#### explorer.reinstall?

```ts
optional reinstall: string[];
```

### preview

```ts
preview: object;
```

#### preview.suppressAddressBar?

```ts
optional suppressAddressBar: boolean;
```

### process

```ts
process: object;
```

#### process.commands

```ts
commands: object;
```

#### process.commands.devServer

```ts
devServer: string;
```

#### process.commands.install

```ts
install: string;
```

#### process.commands.terminal

```ts
terminal: string;
```

#### process.packageManager

```ts
packageManager: "npm" | "pnpm" | "yarn";
```

#### process.starters?

```ts
optional starters: object;
```

#### process.starters.devServer()?

```ts
optional devServer: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

#### process.starters.install()?

```ts
optional install: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

#### process.starters.terminal()?

```ts
optional terminal: () => Promise<void>;
```

##### Returns

`Promise`\<`void`\>

### terminal

```ts
terminal: object;
```

#### terminal.maxCount?

```ts
optional maxCount: number;
```

#### terminal.theme?

```ts
optional theme: object;
```

#### terminal.theme.dark()?

```ts
optional dark: () => ITheme;
```

##### Returns

`ITheme`

#### terminal.theme.light()?

```ts
optional light: () => ITheme;
```

##### Returns

`ITheme`

## Defined in

[packages/sandbox/src/types/Sandbox.ts:4](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/types/Sandbox.ts#L4)
