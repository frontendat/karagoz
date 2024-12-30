# ProcessTabContext

```ts
type ProcessTabContext = object;
```

## Type declaration

### args?

```ts
optional args: string[];
```

### canRestart?

```ts
optional canRestart: boolean;
```

### canStop?

```ts
optional canStop: boolean;
```

### command

```ts
command: string;
```

### exitCode?

```ts
optional exitCode: number;
```

### isHidden?

```ts
optional isHidden: boolean;
```

### isTerminal?

```ts
optional isTerminal: boolean;
```

### logs?

```ts
optional logs: string[];
```

### process?

```ts
optional process: WebContainerProcess;
```

### processInputHandler()?

```ts
optional processInputHandler: (chunk?) => Promise<void>;
```

#### Parameters

##### chunk?

`string`

#### Returns

`Promise`\<`void`\>

### processOutputHandler()?

```ts
optional processOutputHandler: (data) => void;
```

#### Parameters

##### data

`string`

#### Returns

`void`

### suppressClose?

```ts
optional suppressClose: boolean;
```

### suppressInput?

```ts
optional suppressInput: boolean;
```

## Defined in

[packages/sandbox/src/types/Tabs.ts:14](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/types/Tabs.ts#L14)
