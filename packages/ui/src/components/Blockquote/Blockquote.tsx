import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@mindfulyze/utils'

export const blockquoteVariants = cva('font-semibold italic text-foreground', {
  variants: {
    variant: {
      default: 'border-0 bg-transparent',
      solid: 'border-border bg-card text-card-foreground py-1',
      outline: 'border-input bg-transparent',
    },
    size: {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
    },
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    alignment: 'center',
  },
})

export interface BlockquoteProps
  extends React.ButtonHTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, variant, size, alignment, ...props }, ref) => {
    return (
      <div className="prose">
        <blockquote className={cn(blockquoteVariants({ variant, size, alignment, className }))} ref={ref} {...props} />
      </div>
    )
  },
)

Blockquote.displayName = 'Blockquote'
