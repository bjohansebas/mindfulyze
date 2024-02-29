import { getThoughtsPages } from '@lib/actions/thought'

import { Skeleton } from '@mindfulyze/ui'

import { CreateThought } from '@ui/shared/thoughts/create-thoughts'
import { DateRangeThought } from '@ui/thought/data-range-thoughts'
import { ThoughtsList } from '@ui/thought/thoughts-list'
import Pagination from '@ui/thought/thoughts-pagination'
import ThoughtsPlaceholder from '@ui/thought/thoughts-placeholder'

import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string
    fromDate?: string
    toDate?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  const fromDate = searchParams?.fromDate ?? undefined
  const toDate = searchParams?.toDate ?? undefined

  const totalPages = await getThoughtsPages({ fromDate, toDate })

  return (
    <div className="px-6 md:px-0 py-6 flex flex-col max-w-3xl mx-auto gap-5">
      <header className="flex justify-end gap-2 flex-wrap">
        <Suspense fallback={<Skeleton className="rounded-[8px] w-[161px] h-9" />}>
          <CreateThought />
        </Suspense>
        <DateRangeThought />
      </header>
      <section>
        <Suspense key={`${currentPage}${fromDate}${toDate}`} fallback={<ThoughtsPlaceholder />}>
          <ThoughtsList currentPage={currentPage} fromDate={fromDate} toDate={toDate} />
        </Suspense>
      </section>
      {totalPages.data > 1 ? (
        <footer className="flex w-full justify-center">
          <Pagination totalPages={totalPages.data} />
        </footer>
      ) : null}
    </div>
  )
}
