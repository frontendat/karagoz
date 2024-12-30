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

Default value to be used when creating editor tabs.

#### editor.theme?

```ts
optional theme: object;
```

Themes to be used by codemirror.

Using callbacks to overcome the readonly nature of the options returned by `useSandbox()`.

It is also to avoid the "Type instantiation is excessively deep and possibly infinite." error.

The callbacks return an array to allow passing multiple themes (e.g. base theme and a theme for overrides).

#### editor.theme.dark()?

```ts
optional dark: () => Extension[];
```

Callback that returns a list of dark codemirror themes.

##### Returns

`Extension`[]

#### editor.theme.light()?

```ts
optional light: () => Extension[];
```

Callback that returns a list of light codemirror themes.

##### Returns

`Extension`[]

### explorer

```ts
explorer: object;
```

Path patterns to be used for matching.
The matchers use .gitignore-style matching through [ignore](https://www.npmjs.com/package/ignore) to determine
whether a give path matches one of the patterns.

#### explorer.hidden?

```ts
optional hidden: string[];
```

List of patterns to determine whether an entity (directory or file) should be hidden in the file explorer.

#### explorer.readonly?

```ts
optional readonly: string[];
```

List of patterns to determine whether an entity (directory or file) should be marked as readonly in the file
explorer and editor tabs.

#### explorer.reinstall?

```ts
optional reinstall: string[];
```

List of patterns to determine whether changing an entity (directory or file) should trigger the re-installation
of dependencies and re-bootstrapping.

### preview

```ts
preview: object;
```

Preview related options.

#### preview.suppressAddressBar?

```ts
optional suppressAddressBar: boolean;
```

When true, the address bar in the preview panel will not be shown.

### process

```ts
process: object;
```

Preview / terminal related options.

#### process.commands

```ts
commands: object;
```

Predefined commands.

#### process.commands.devServer

```ts
devServer: string;
```

Command to start dev server.

##### Default

```ts
npm start
```

#### process.commands.install

```ts
install: string;
```

Dependency installation command.

##### Default

```ts
npm install
```

#### process.commands.terminal

```ts
terminal: string;
```

Command to start a terminal.

##### Default

```ts
jsh
```

#### process.packageManager

```ts
packageManager: "npm" | "pnpm" | "yarn";
```

Package manager. Setting this option adjusts the predefined commands accordingly.

#### process.starters?

```ts
optional starters: object;
```

Callbacks to spawn the processes of the predefined commands.
Implemented as a sensible default and do some opinionated stuff.

If more control is needed, a process can be started using `useSandbox().processTabs.open()`.

#### process.starters.devServer()?

```ts
optional devServer: () => Promise<void>;
```

Dev server process starter.

##### Returns

`Promise`\<`void`\>

#### process.starters.install()?

```ts
optional install: () => Promise<void>;
```

Dependency installation process starter.

##### Returns

`Promise`\<`void`\>

#### process.starters.terminal()?

```ts
optional terminal: () => Promise<void>;
```

Terminal process starter.

##### Returns

`Promise`\<`void`\>

### terminal

```ts
terminal: object;
```

Terminal related options.

#### terminal.maxCount?

```ts
optional maxCount: number;
```

Maximum number of terminal tabs to be opened simultaneously.

##### Default

```ts
3
```

#### terminal.theme?

```ts
optional theme: object;
```

Theme to be used by xterm to output process and terminal logs.

Using callbacks to overcome the readonly nature of the options returned by useSandbox().

#### terminal.theme.dark()?

```ts
optional dark: () => ITheme;
```

Callback to return dark xterm theme.

##### Returns

`ITheme`

#### terminal.theme.light()?

```ts
optional light: () => ITheme;
```

Callback to return light xterm theme.

##### Returns

`ITheme`

## Defined in

[packages/sandbox/src/types/Sandbox.ts:4](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/types/Sandbox.ts#L4)
