import { createSharedComposable } from '@vueuse/core'

import { useWebContainer } from './useWebContainer.ts'

export const useSharedWebContainer = createSharedComposable(useWebContainer)
