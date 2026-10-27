# Sandbox

The Karagöz Sandbox (`@karagoz/sandbox`): an in-browser code editor, file explorer, terminal and preview, driven by a WebContainer.

## Language

**Container**:
The WebContainer instance the sandbox runs files and processes in. Reserved for this meaning only.
_Avoid_: VM, runtime, instance

**Fake container**:
The shared in-memory stand-in for the container used by sandbox tests: a file system, process spawning and teardown, with no real WebContainer.
_Avoid_: Mock container, stub container
