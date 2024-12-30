# Tab\<T\>

```ts
type Tab<T> = object;
```

Generic tab definition.

## Type Parameters

• **T** = `undefined`

## Type declaration

### context?

```ts
optional context: T;
```

Additional context information.

### id

```ts
id: string;
```

Unique tab ID

### label

```ts
label: string;
```

Label to be shown in the tab list.

### order

```ts
order: number;
```

Order of the tab. When a tab is opened or focused it gets a new order = `[current max order] + 1`.

## Defined in

[packages/sandbox/src/types/Tabs.ts:6](https://github.com/frontendat/karagoz/blob/main/packages/sandbox/src/types/Tabs.ts#L6)
