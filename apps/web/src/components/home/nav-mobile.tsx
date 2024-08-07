'use client'

import Link from 'next/link'
import { type ReactNode, useEffect, useRef } from 'react'

import { motion, useCycle } from 'framer-motion'

import { Button } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'
import type { Session } from 'next-auth'
import { ButtonsNavMobile } from './button-nav-mobile'
import { navItems } from './nav'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

export default function MobileNav({ session }: { session: Session | null }) {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={cn('inset-0 z-50 w-full lg:hidden', { fixed: isOpen, 'pointer-events-none absolute': !isOpen })}
      ref={containerRef}
    >
      <motion.div className="absolute inset-0 right-0 w-full bg-card" variants={sidebar} />
      <motion.ul variants={variants} className="absolute grid w-full gap-3 px-10 py-16">
        {navItems.map(({ name, slug }) => {
          return (
            <div key={slug} className="grid gap-3">
              <MenuItem>
                <Link
                  href={`/${slug}`}
                  onClick={() => toggleOpen()}
                  className="flex w-full font-semibold capitalize hover:text-emerald-600"
                >
                  {name}
                </Link>
              </MenuItem>
              <MenuItem className="my-3 h-px w-full bg-gray-300" />
            </div>
          )
        })}
        <ButtonsNavMobile session={session} />
      </motion.ul>
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  )
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const MenuToggle = ({ toggle }: { toggle: any }) => (
  <Button onClick={toggle} className="pointer-events-auto absolute top-6 right-7 z-20 p-0" variant="link" size="sm">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </Button>
)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Path = (props: any) => (
  <motion.path fill="transparent" strokeWidth="2" stroke="hsl(164 10% 97.05%)" strokeLinecap="round" {...props} />
)

export const MenuItem = ({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  )
}

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
}

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [ref])

  return dimensions.current
}
