import { cva, type VariantProps } from 'class-variance-authority'

export { default as LoadingIndicator } from './LoadingIndicator.vue'

export const loadingIndicatorVariants = cva(
  'flex flex-col gap-4 h-full items-center justify-center text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'text-primary',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        default: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type LoadingIndicatorVariants = VariantProps<
  typeof loadingIndicatorVariants
>
