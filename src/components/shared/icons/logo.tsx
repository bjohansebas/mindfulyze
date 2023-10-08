import { cn } from '@/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={cn('h-10 w-10', className)}>
      <defs>
        <clipPath id="a">
          <path d="M0 0h512v512H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M76.867 0h358.266c8.831 0 12.794 6.412 8.844 14.311L274.936 352.393c-3.535 7.07-1.53 16.983 4.475 22.124l148.435 127.078C434.554 507.337 432.831 512 424 512H76.867c-8.831 0-12.745-6.388-8.735-14.256l175.995-345.347c3.589-7.043 1.334-16.564-5.033-21.249L73.754 9.483C66.642 4.249 68.036 0 76.867 0Z"
        />
      </g>
    </svg>
  )
}
