# useSandbox()

```ts
function useSandbox(): object
```

The main composable of Karagöz Sandbox.

Injects and uses the provided web container promise, performs bootstrapping and returns an object that
is the central piece in the logic of the sandbox.

This composable is created as a shared instance (singleton, if you will) using VueUse's `createSharedComposable()`.

## Returns

`object`

### bootstrap()

```ts
bootstrap: () => Promise<void>;
```

Bootstrap method. Should be called after the web container boots and the first batch of files
(most importantly `package.json`) are mounted.

Order of execution:
- Kill dependency installation and dev server if either of them is running.
- On first run: listen to URL change events in the preview iframe to emit the latest URL to the parent window.
  This is needed to show the current UR in address bar of the preview.
- Open a terminal window if allowed by the sandbox options.
- Install dependencies.
- Start dev server.
- On first run: watch the current working directory to re-bootstrap when a file changes that should trigger
  re-install (e.g. `package.json`).

#### Returns

`Promise`\<`void`\>

### container

```ts
container: ComputedRef<null | WebContainer>;
```

A computed ref that gives access to the web container instance.

### editorTabs

```ts
editorTabs: object;
```

Editor tabs manager. Responsible for opening, focusing and closing editor tabs.

#### editorTabs.close()

```ts
close: (id) => void;
```

Close a tab corresponding to given ID.

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

Computed ref containing the currently focused tab.

#### editorTabs.findTab()

```ts
findTab: (id) => 
  | undefined
| Tab<EditorTabContext>;
```

Find the tab corresponding to given ID.

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

Find the tab index corresponding to given ID.

##### Parameters

###### id

`string`

##### Returns

`number`

#### editorTabs.open()

```ts
open: (id, label?, context?) => void;
```

Open an editor tab for a file. If the file is already open it is re-focused.

##### Parameters

###### id

`string`

file path, used as an ID as well

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

List of tabs.

#### editorTabs.updateContext()

```ts
updateContext: (id, setter) => void;
```

Update the context data of the tab corresponding to give ID.

##### Parameters

###### id

`string`

###### setter

(`ctx`) => [`EditorTabContext`](../type-aliases/EditorTabContext.md)

a callback that receives the old context and returns the new context to be set.

##### Returns

`void`

### explorer

```ts
explorer: object;
```

Provides matchers for different purposes.
The matchers use [ignore](https://www.npmjs.com/package/ignore) to determine whether a give path matches one
of the patterns specified in the sandbox options.

#### explorer.hidden

```ts
hidden: ComputedRef<Ignore>;
```

Computed ref containing a function to determine whether an entity (directory or file) should be
hidden in the file explorer.

#### explorer.readonly

```ts
readonly: ComputedRef<Ignore>;
```

Computed ref containing a function to determine whether an entity (directory or file) should be
marked as readonly in the file explorer and editor tabs.

#### explorer.reinstall

```ts
reinstall: ComputedRef<Ignore>;
```

Computed ref containing a function to determine whether changing an entity (directory or file) should
trigger the re-installation of dependencies and re-bootstrapping.

### options

```ts
options: object;
```

#### options.editor

```ts
readonly editor: object;
```

Editor related options.

#### options.editor.suppressClose?

```ts
readonly optional suppressClose: boolean;
```

Default value to be used when creating editor tabs.

#### options.editor.theme?

```ts
readonly optional theme: object;
```

Themes to be used by codemirror.

Using callbacks to overcome the readonly nature of the options returned by `useSandbox()`.

It is also to avoid the "Type instantiation is excessively deep and possibly infinite." error.

The callbacks return an array to allow passing multiple themes (e.g. base theme and a theme for overrides).

#### options.editor.theme.dark()?

```ts
readonly optional dark: () => Extension[];
```

Callback that returns a list of dark codemirror themes.

##### Returns

`Extension`[]

#### options.editor.theme.light()?

```ts
readonly optional light: () => Extension[];
```

Callback that returns a list of light codemirror themes.

##### Returns

`Extension`[]

#### options.explorer

```ts
readonly explorer: object;
```

Path patterns to be used for matching.
The matchers use .gitignore-style matching through [ignore](https://www.npmjs.com/package/ignore) to determine
whether a give path matches one of the patterns.

#### options.explorer.hidden?

```ts
readonly optional hidden: readonly string[];
```

List of patterns to determine whether an entity (directory or file) should be hidden in the file explorer.

#### options.explorer.readonly?

```ts
readonly optional readonly: readonly string[];
```

List of patterns to determine whether an entity (directory or file) should be marked as readonly in the file
explorer and editor tabs.

#### options.explorer.reinstall?

```ts
readonly optional reinstall: readonly string[];
```

List of patterns to determine whether changing an entity (directory or file) should trigger the re-installation
of dependencies and re-bootstrapping.

#### options.preview

```ts
readonly preview: object;
```

Preview related options.

#### options.preview.suppressAddressBar?

```ts
readonly optional suppressAddressBar: boolean;
```

When true, the address bar in the preview panel will not be shown.

#### options.process

```ts
readonly process: object;
```

Preview / terminal related options.

#### options.process.commands

```ts
readonly commands: object;
```

Predefined commands.

#### options.process.commands.devServer

```ts
readonly devServer: string;
```

Command to start dev server.

##### Default

```ts
npm start
```

#### options.process.commands.install

```ts
readonly install: string;
```

Dependency installation command.

##### Default

```ts
npm install
```

#### options.process.commands.terminal

```ts
readonly terminal: string;
```

Command to start a terminal.

##### Default

```ts
jsh
```

#### options.process.packageManager

```ts
readonly packageManager: "npm" | "pnpm" | "yarn";
```

Package manager. Setting this option adjusts the predefined commands accordingly.

#### options.process.starters?

```ts
readonly optional starters: object;
```

Callbacks to spawn the processes of the predefined commands.
Implemented as a sensible default and do some opinionated stuff.

If more control is needed, a process can be started using `useSandbox().processTabs.open()`.

#### options.process.starters.devServer()?

```ts
readonly optional devServer: () => Promise<void>;
```

Dev server process starter.

##### Returns

`Promise`\<`void`\>

#### options.process.starters.install()?

```ts
readonly optional install: () => Promise<void>;
```

Dependency installation process starter.

##### Returns

`Promise`\<`void`\>

#### options.process.starters.terminal()?

```ts
readonly optional terminal: () => Promise<void>;
```

Terminal process starter.

##### Returns

`Promise`\<`void`\>

#### options.terminal

```ts
readonly terminal: object;
```

Terminal related options.

#### options.terminal.maxCount?

```ts
readonly optional maxCount: number;
```

Maximum number of terminal tabs to be opened simultaneously.

##### Default

```ts
3
```

#### options.terminal.theme?

```ts
readonly optional theme: object;
```

Theme to be used by xterm to output process and terminal logs.

Using callbacks to overcome the readonly nature of the options returned by useSandbox().

#### options.terminal.theme.dark()?

```ts
readonly optional dark: () => ITheme;
```

Callback to return dark xterm theme.

##### Returns

`ITheme`

#### options.terminal.theme.light()?

```ts
readonly optional light: () => ITheme;
```

Callback to return light xterm theme.

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

A reference to the preview iframe element.

#### preview.reload()

```ts
reload: () => Promise<void>;
```

Reload the preview.

##### Returns

`Promise`\<`void`\>

#### preview.suppressAddressBar

```ts
suppressAddressBar: ComputedRef<undefined | boolean>;
```

Computed ref containing a boolean flag. When true, the address bar in the preview panel will not be shown.

#### preview.url

```ts
url: ComputedRef<string>;
```

The preview URL.

### processTabs

```ts
processTabs: object;
```

Process tabs manager. Responsible for opening, focusing and closing process and terminal tabs.

#### processTabs.availableTerminals

```ts
availableTerminals: ComputedRef<number>;
```

#### processTabs.close()

```ts
close: (id) => void;
```

Close the process tab corresponding to the given ID and kill the process attached to it.

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

Computed ref containing the currently focused tab.

#### processTabs.findTab()

```ts
findTab: (id) => 
  | undefined
| Tab<ProcessTabContext>;
```

Find the tab corresponding to given ID.

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

Find the tab index corresponding to given ID.

##### Parameters

###### id

`string`

##### Returns

`number`

#### processTabs.kill()

```ts
kill: (id) => void;
```

Kill the process corresponding to the give ID.

##### Parameters

###### id

`string`

##### Returns

`void`

#### processTabs.open()

```ts
open: (id, label?, context?) => Promise<void>;
```

Open a process tab.If the process tab already exists, it is re-focused, otherwise the process will be started.

##### Parameters

###### id

`string`

###### label?

`string`

###### context?

[`ProcessTabContext`](../type-aliases/ProcessTabContext.md)

##### Returns

`Promise`\<`void`\>

##### Example

```ts
useSandbox()
  .processTabs
  .open('npm install', 'Install', {
    command: 'npm',
    arguments: ['install', '--frozen-lockfile']
  })
```

#### processTabs.restart()

```ts
restart: (id) => Promise<void>;
```

Restart the process corresponding to the given ID.

##### Parameters

###### id

`string`

##### Returns

`Promise`\<`void`\>

#### processTabs.tabs

```ts
tabs: ComputedRef<Tab<ProcessTabContext>[]>;
```

List of tabs.

#### processTabs.updateContext()

```ts
updateContext: (id, setter) => void;
```

Update the context data of the tab corresponding to give ID.

##### Parameters

###### id

`string`

###### setter

(`ctx`) => [`ProcessTabContext`](../type-aliases/ProcessTabContext.md)

a callback that receives the old context and returns the new context to be set.

##### Returns

`void`

### setOption()

```ts
setOption: <K, T>(key, newValueOrSetter) => void;
```

Set an option. Ideally options are set before calling `bootstrap()`.

Rather than allowing the direct mutation of the options object, the return of `useSandbox()` exposes a readonly
copy of the options and `setOption()` is used to set a specific option's value. This is to make sure that setting
options is intentional and not by mistake.

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

either a new value or a callback that receives the old value to produce the new value.

`T` | (`oldValue`) => `T`

#### Returns

`void`

### setPackageManager()

```ts
setPackageManager: (pm) => void;
```

Set the package manager option.
This affects only the predefined commands and processes (in `SandboxOptions.process.commands`).

#### Parameters

##### pm

`"npm"` | `"pnpm"` | `"yarn"`

#### Returns

`void`

## Defined in

[packages/sandbox/src/composables/useSandbox.ts:254](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/composables/useSandbox.ts#L254)
