import { asyncComputed } from '@vueuse/core'
import { nextTick, toRaw } from 'vue'

import { ProcessTabContext } from '../types'
import { injectWebContainer } from '../utils/WebContainer.ts'
import { useSandboxTabs } from './useSandboxTabs.ts'

export const useSandboxProcessTabs = () => {
  const container = asyncComputed(injectWebContainer, undefined)
  const processTabs = useSandboxTabs<ProcessTabContext>()

  const startProcess = async (id: string, context: ProcessTabContext) => {
    // Create process
    const process = await container.value.spawn(
      context.command,
      context.args ?? [],
    )

    // Do not await `exit`, otherwise this function won't resolve until the process finishes.
    process.exit.then((exitCode) => {
      processTabs.updateContext(id, (ctx) => ({
        ...ctx,
        exitCode,
      }))
    })

    // Handle process output
    if (process && !process?.output.locked) {
      // Do not await `pipeTo` either.
      process?.output.pipeTo(
        new WritableStream({
          write(data) {
            // The output cannot be streamed multiple times (will be locked), that's why we have to
            // persist it in `tab.context.logs` in order to render it again, when `KrgzProcess` is re-mounted.
            processTabs.updateContext(id, (ctx) => ({
              ...ctx,
              logs: [...(ctx.logs ?? []), data],
            }))
            // For the same reason we use processOutputHandler to handle the output while `KrgzProcess` is rendered
            // to pass the logs to the `xterm` instance.
            // Use 'processTabs.findTab' instead of `process` to make sure we're accessing the right instance.
            processTabs.findTab(id)?.context?.processOutputHandler?.(data)
          },
        }),
      )
    }

    // The `xterm` instance in `KrgzProcess` can handle user input in the terminal using `processInputHandler`.
    const writer =
      process && !process?.input.locked ? process?.input.getWriter() : undefined
    const processInputHandler = writer?.write.bind(writer)

    // Return the updated `context` with the created process instance and handlers.
    return {
      ...context,
      process,
      processInputHandler,
    }
  }

  const kill = (id: string) => {
    const tab = processTabs.findTab(id)
    if (tab?.context?.exitCode === undefined) {
      processTabs.findTab(id)?.context?.process?.kill()
    }
  }

  const open = async (
    id: string,
    label?: string,
    context?: ProcessTabContext,
  ) => {
    const index = processTabs.findTabIndex(id)
    if (index === -1 && context) {
      processTabs.open(id, label, await startProcess(id, context))
    } else {
      processTabs.open(id)
    }
  }

  const restart = async (id: string) => {
    const tab = processTabs.findTab(id)
    const context = tab?.context
    if (context) {
      kill(id)
      await nextTick()
      close(id)
      await nextTick()
      await context.process?.exit
      open(
        id,
        tab?.label,
        await startProcess(id, {
          ...toRaw(context),
          args: toRaw(context.args),
          exitCode: undefined,
          logs: [],
        }),
      )
    }
  }

  const close = (id: string) => {
    kill(id)
    processTabs.close(id)
  }

  return {
    ...processTabs,
    close,
    kill,
    open,
    restart,
  }
}
