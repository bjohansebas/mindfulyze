import { cn } from '@/lib/utils'
import styles from './spinner.module.css'

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('h-5 w-5', className)}>
      <div className={cn(styles.spinner, 'h-5 w-5', className)}>
        {[...Array(12)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={i} />
        ))}
      </div>
    </div>
  )
}
