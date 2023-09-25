import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { Sheet } from 'lucide-react'

export function MenuLinks() {
  return (
    <Sheet>
      <SheetTrigger>
        <Bars3Icon className="w-4 h-4" />
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
