import { WebContainer } from '@webcontainer/api'

import { ProcessTabContext } from '../types'
import { useKaragozSandboxEvents } from './useKaragozSandboxEvents.ts'
import { useKaragozSandboxTabs } from './useKaragozSandboxTabs.ts'

export const useKaragozSandboxProcessTabs = (container: WebContainer) => {
  const { bus } = useKaragozSandboxEvents()
  const processTabs = useKaragozSandboxTabs<ProcessTabContext>()

  const startProcess = async (context: ProcessTabContext) => {
    const process = await container.spawn(context.command, context.args ?? [])
    if (!process) {
      bus.error.trigger({
        container,
        error: { message: 'rocess did not start.', context },
      })
    }
    return process
  }

  const open = async (
    id: string,
    label?: string,
    context?: ProcessTabContext,
  ) => {
    const index = processTabs.findTabIndex(id)
    if (index === -1 && context) {
      processTabs.open(id, label, {
        ...context,
        process: await startProcess(context),
      })
    } else {
      processTabs.open(id)
    }
  }

  const close = (id: string) => {
    const tab = processTabs.findTab(id)
    if (tab !== null) {
      tab?.context?.process?.kill()
    }
    processTabs.close(id)
  }

  return {
    ...processTabs,
    close,
    open,
  }
}
