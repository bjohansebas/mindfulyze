import { Button } from "@/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import EditorThought from "./editor-thought"

export function DialogThought() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create thought</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl h-[70vh]">
        <EditorThought />
      </DialogContent>
    </Dialog>
  )
}
