import { cva, type VariantProps } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  'relative w-full rounded-lg p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        tip: 'border border-emerald-500/40 bg-emerald-500/10 text-foreground [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400',
        warning:
          'border border-amber-500/40 bg-amber-500/10 text-foreground [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400',
        note: 'border border-sky-500/40 bg-sky-500/10 text-foreground [&>svg]:text-sky-600 dark:[&>svg]:text-sky-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/** Shared with `AlertTitle`/`AlertDescription` so non-component renderers (e.g. markdown HTML) stay in sync. */
export const alertTitleClass = 'mb-1 font-medium leading-none tracking-tight'
export const alertDescriptionClass = 'text-sm [&_p]:leading-relaxed'

export type AlertVariants = VariantProps<typeof alertVariants>
