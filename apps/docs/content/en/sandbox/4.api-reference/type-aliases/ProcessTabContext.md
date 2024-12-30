# ProcessTabContext

```ts
type ProcessTabContext = object;
```

Context information for a process / terminal tab.

## Type declaration

### args?

```ts
optional args: string[];
```

Arguments to be passed to `WebContainer.spawn()`.

### canRestart?

```ts
optional canRestart: boolean;
```

When true, a restart icon will appear next to the label and the process can be restarted.
Ignored when `isTerminal: true`.

### canStop?

```ts
optional canStop: boolean;
```

When true, a restart icon will appear next to the label and the process can be stopped.
Ignored when `isTerminal: true`.

### command

```ts
command: string;
```

Command to be passed to `WebContainer.spawn()`.

### exitCode?

```ts
optional exitCode: number;
```

Exit code of the finished / terminated process.

### isHidden?

```ts
optional isHidden: boolean;
```

When true, the process will run in the background and will not be shown in the tab list.

### isTerminal?

```ts
optional isTerminal: boolean;
```

When true, the process is treated as a terminal: some flags are ignored and the tab will be shown in the
terminals panel and not in the processes panel.

### logs?

```ts
optional logs: string[];
```

Used to persist the logs and re-fill xterm when the tab is closed and re-opened.

### process?

```ts
optional process: WebContainerProcess;
```

The process instance.

### processInputHandler()?

```ts
optional processInputHandler: (chunk?) => Promise<void>;
```

Input handler, needed to accept input in xterm and pass it to the process in the web container.

#### Parameters

##### chunk?

`string`

#### Returns

`Promise`\<`void`\>

### processOutputHandler()?

```ts
optional processOutputHandler: (data) => void;
```

Output handler, needed to read and store the logs to be displayed by xterm.

#### Parameters

##### data

`string`

#### Returns

`void`

### suppressClose?

```ts
optional suppressClose: boolean;
```

When true, the close icon next to the tab label will be omitted.

### suppressInput?

```ts
optional suppressInput: boolean;
```

When true, xterm will not accept user input.

## Defined in

[packages/sandbox/src/types/Tabs.ts:38](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/types/Tabs.ts#L38)
