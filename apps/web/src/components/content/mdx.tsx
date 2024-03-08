import { cn } from '@mindfulyze/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

function CustomLink(props) {
  const href = props.href
  console.log('het')

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props} className="text-foreground">
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} className="text-foreground" />
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} className="text-primary" />
}

interface MDXProps {
  code: string
  className?: string
}

export function MDX({ code, className }: MDXProps) {
  return (
    <article className={cn('prose prose-neutral dark:prose-invert max-w-none transition-all', className)}>
      <MDXRemote source={code} />
    </article>
  )
}
