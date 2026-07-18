<script setup lang="ts">
import {
  Button,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@karagoz/shared'
import { TooltipContentProps } from 'radix-vue'
import { computed } from 'vue'

/**
 * Renders a panel toggle.
 *
 * This component is used to render panel toggles and additional functionality buttons
 * in the default layout component `KrgzSandbox`.
 */
defineOptions({})

const props = withDefaults(
  defineProps<{
    /**
     * Render as a button and not a toggle.
     */
    asButton?: boolean
    /**
     * Initial status of the toggle.
     */
    pressed?: boolean
    /**
     * Label to be used as aria-label and tooltip content. Also rendered as a visible text label
     * next to the icon for the `tab` and `bottom-bar` variants (toggle role only).
     */
    label: string
    /**
     * Which side the tooltip should be shown on.
     */
    side?: TooltipContentProps['side']
    /**
     * Whether to disabled tooltip content portal.
     * Must be set to `true` for full-screen and `false` for non-full-screen, otherwise tooltips break.
     */
    tooltipContentPortalDisabled?: boolean
    /**
     * Visual style of the toggle/button.
     * - `rail`: icon-only button in a vertical icon rail (default).
     * - `tab`: ghost/pill horizontal button; toggle role shows an icon + visible label.
     * - `bottom-bar`: icon + label stacked vertically in a full-width flex button.
     */
    variant?: 'rail' | 'tab' | 'bottom-bar'
  }>(),
  {
    variant: 'rail',
  },
)

defineEmits<{
  /**
   * Emitted when the toggle / button is clicked.
   */
  (e: 'press'): void
}>()

/**
 * Styling for each variant, keyed once and shared by both the `Toggle` and `Button` (`asButton`)
 * render paths so the two never drift out of sync.
 */
const variantStyles = {
  rail: {
    toggleVariant: 'outline',
    toggleClass: '',
    buttonVariant: 'outline',
    buttonClass: 'w-full',
  },
  tab: {
    toggleVariant: 'default',
    toggleClass: 'gap-2 rounded-full h-8 px-3 text-xs font-medium',
    buttonVariant: 'ghost',
    buttonClass: 'h-8 w-8 rounded-full',
  },
  'bottom-bar': {
    toggleVariant: 'default',
    toggleClass:
      'flex-1 h-auto flex-col gap-1 rounded-none px-2 py-1.5 text-[10px] font-medium',
    buttonVariant: 'ghost',
    buttonClass:
      'flex-1 h-auto w-auto flex-col gap-1 rounded-none px-2 py-1.5 text-[10px] font-medium',
  },
} as const

const style = computed(() => variantStyles[props.variant])
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="0">
      <TooltipTrigger>
        <Button
          v-if="asButton"
          :aria-label="label"
          :class="style.buttonClass"
          size="icon"
          :variant="style.buttonVariant"
          @click="$emit('press')"
        >
          <slot />
        </Button>
        <Toggle
          v-else
          :aria-label="label"
          :class="style.toggleClass"
          :pressed="pressed || undefined"
          :variant="style.toggleVariant"
          @update:pressed="$emit('press')"
        >
          <slot />
          <span v-if="variant !== 'rail'">{{ label }}</span>
        </Toggle>
      </TooltipTrigger>
      <TooltipContent
        class="text-xs"
        :portal="{ disabled: tooltipContentPortalDisabled }"
        :side="side ?? 'right'"
        :side-offset="5"
      >
        {{ label }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
