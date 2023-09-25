'use client'

import { deleteThought, updateThought } from '@/app/actions/thoughts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/ui/alert-dialog'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { TrashIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Link from 'next/link'
import { toast } from 'sonner'
import { OptionsCardTemplate } from './options-card-template'

export interface CardTemplateProps {
  title: string
  id: string
}
export function CardTemplate({ title, id }: CardTemplateProps) {
  return (
    <Link
      className="font-medium px-6 py-2 w-full bg-card border rounded-lg flex justify-between items-center"
      href={`/templates/${id}`}
    >
      {title}
      <OptionsCardTemplate id={id} />
    </Link>
  )
}
