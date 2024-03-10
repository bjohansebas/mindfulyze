'use client'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

import { format, isValid, set, toDate as toDateFormat } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { useDebouncedCallback } from 'use-debounce'

export function DateRangeThought({ className }: { className?: string }) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const fromDate = searchParams.get('fromDate')
  const toDate = searchParams.get('toDate')

  const [date, setDate] = useState<DateRange | undefined>({
    from: fromDate != null && isValid(new Date(fromDate)) ? toDateFormat(fromDate) : undefined,
    to: toDate != null && isValid(new Date(toDate)) ? toDateFormat(toDate) : undefined,
  })

  const handleDateRange = useDebouncedCallback((date: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams)

    if (date != null) {
      date.from ? params.set('fromDate', date.from.toISOString() || '') : params.delete('fromDate')

      date.to
        ? params.set('toDate', set(date.to, { hours: 23, minutes: 59, seconds: 59 }).toISOString() || '')
        : params.delete('toDate')

      params.delete('page')
    }

    if (date == null) {
      params.delete('fromDate')
      params.delete('toDate')
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
              handleDateRange(e)
              setDate(e)
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
