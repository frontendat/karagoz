# KrgzExplorer

> Renders the file explorer.

This component reads and renders the contents of the current working directory, as well as, any expanded directory
by recursively using the internal components `KrgzExplorerEntity` and `KrgzExplorerSubdir`.

It initially renders a loading indicator until contents of the directory have been read.

It takes no props and emits no events since it gets all that it needs to operate by calling `useSandbox()`.

---
