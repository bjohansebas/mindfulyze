import { cn } from '@mindfulyze/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('h-5 w-5', className)}>
      <div className={cn('loading-spinner', 'relative left-1/2 top-1/2 h-5 w-5', className)}>
        {[...Array(12)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            style={{
              animationDelay: `${-1.2 + 0.1 * i}s`,
              transform: `rotate(${30 * i}deg) translate(120%)`,
            }}
            className="animate-spinner bg-current w-[30%] h-[8%] absolute rounded-2xl -left-[10%] -top-[4%]"
          />
        ))}
      </div>
    </div>
  )
}
