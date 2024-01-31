import { getThoughtsPages } from '@/lib/api/thoughts'
import Pagination from '@ui/thought/pagination'
import { ThoughtsList } from '@ui/thought/thoughts-list'
import ThoughtsPlaceholder from '@ui/thought/thoughts-placeholder'

import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await getThoughtsPages()

  return (
    <div className="h-screen md:px-12 px-6 pb-6 flex flex-col max-w-full">
      <Suspense key={currentPage} fallback={<ThoughtsPlaceholder />}>
        <ThoughtsList currentPage={currentPage} />
      </Suspense>
      <div className="mt-10 flex w-full justify-center">
        <Pagination totalPages={totalPages.data} />
      </div>
    </div>
  )
}
