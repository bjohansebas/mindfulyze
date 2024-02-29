'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  buttonVariants,
} from '@mindfulyze/ui'
import { cn, generatePagination } from '@mindfulyze/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { usePathname, useSearchParams } from 'next/navigation'

export default function PaginationThoughts({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage - 1 === 0 ? (
            <PaginationItem className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1 hover:bg-popover/30')}>
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </PaginationItem>
          ) : (
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          )}
        </PaginationItem>
        {allPages.map((page) => (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            isMiddle={page === '...'}
            isActive={currentPage === page}
          />
        ))}
        {currentPage >= totalPages ? (
          <PaginationItem className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1 hover:bg-popover/30')}>
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </PaginationItem>
        ) : (
          <PaginationNext href={createPageURL(currentPage + 1)} />
        )}
      </PaginationContent>
    </Pagination>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  isMiddle,
}: {
  page: number | string
  href: string
  isMiddle: boolean
  isActive: boolean
}) {
  return isActive ? (
    <PaginationItem
      className={buttonVariants({
        variant: 'outline',
      })}
    >
      {page}
    </PaginationItem>
  ) : isMiddle ? (
    <PaginationEllipsis />
  ) : (
    <PaginationItem>
      <PaginationLink href={href}>{page}</PaginationLink>
    </PaginationItem>
  )
}
