'use client'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useDebouncedCallback } from 'use-debounce'

export function DateRangeThought({ className }: { className?: string }) {
  const { push, replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const fromDate = searchParams.get('fromDate')
  const toDate = searchParams.get('toDate')

  const [date, setDate] = useState<DateRange | undefined>({
    from: dayjs(fromDate).isValid() ? dayjs(fromDate).toDate() : undefined,
    to: dayjs(toDate).isValid() ? dayjs(toDate).toDate() : undefined,
  })

  const handleDateRange = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams)

    if (date != null) {
      date.from ? params.set('fromDate', date.from.toISOString() || '') : params.delete('fromDate')

      date.to
        ? params.set('toDate', dayjs(date.to).set('hour', 24).set('hour', 59).set('second', 59).toISOString() || '')
        : params.delete('toDate')

      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 400)

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[250px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Select Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => {
              handleDateRange()
              setDate(e)
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
