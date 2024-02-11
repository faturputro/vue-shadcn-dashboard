import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'dark:border-emerald-600 dark:text-emerald-400 dark:bg-emerald-900/50 border-emerald-500 text-emerald-500 bg-emerald-400/20',
        warning: 'dark:border-amber-500 dark:text-amber-500 dark:bg-amber-900/50 border-amber-500 text-amber-500 bg-amber-400/20',
        danger: 'dark:border-red-500 dark:text-red-500 dark:bg-red-900/50 border-red-500 text-red-500 bg-red-400/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
