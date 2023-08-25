import { Button } from '@/ui/button'
import Editor from '@/ui/editor'
import { EditorDate } from '../../../ui/dashboard/editor-date'

export default function Page() {
  return (
    <div className='flex flex-col items-center w-full mt-6'>
      <div className='flex flex-col bg-white gap-1 sm:w-2/4 min-w-[300px] w-screen rounded-lg'>
        <Editor />
        <div className='flex justify-between items-center px-6 py-2'>
          <div>
            <EditorDate />
          </div>
          <div>
            <Button>Create</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
