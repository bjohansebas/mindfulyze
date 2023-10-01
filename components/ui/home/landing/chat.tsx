import Magic from '@/components/shared/icons/magic'
import { Badge } from '@/components/ui/badge'

const Chat = () => {
  return (
    <div className="gap-4 mx-auto max-w-lg px-4 text-center sm:max-w-4xl flex justify-between items-center pb-16 pt-8 flex-col">
      <Magic className="sm:w-48 sm:h-48 w-32 h-32" />
      <h2 className="font-display text-xl font-bold leading-[1.15] text-primary-600 sm:text-6xl sm:leading-[1.15]">
        Chat with IA <Badge>Soon</Badge>
      </h2>
      <p className="max-w-md">
        You can safely converse with a friendly artificial intelligence that will ask you about your day or how
        you&apos;re feeling.
      </p>
    </div>
  )
}

export default Chat
