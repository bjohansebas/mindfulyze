import { formatDate } from '@/lib/utils'
import Author from './author'

import { BlogPost } from 'contentlayer/generated'

import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({
  data,
  priority,
}: {
  data: BlogPost
  priority?: boolean
}) {
  return (
    <Link href={`/blog/${data.slug}`} className="flex flex-col rounded-lg border border-gray-200">
      <Image
        className="aspect-[1200/630] rounded-t-xl object-cover"
        src={data.image}
        width={1200}
        height={630}
        alt={data.title}
        priority={priority}
      />
      <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-white p-6">
        <div>
          <h2 className="line-clamp-1 text-2xl font-bold text-gray-700">{data.title}</h2>
          <p className="mt-2 line-clamp-2 text-gray-500">{data.summary}</p>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Author username={data.author} />
          <time dateTime={data.publishedAt} className="text-sm text-gray-500">
            {formatDate(data.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  )
}
