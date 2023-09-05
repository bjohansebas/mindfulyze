import Image from 'next/image'
import { Badge } from "@/ui/badge"

const SentimentAnalysis= () => {
  
  return (
    <div className="relative h-screen mx-auto max-w-lg px-2.5 text-center sm:max-w-4xl sm:px-0 flex justify-center flex-col gap-5 items-center">
<div>
  <Image src="/_static/emojis/disappointed_face_3d.png" width="100" height="100" className="absolute left-4 top-3"/>
  <Image src="/_static/emojis/frowning_face_3d.png" width="100" height="100" className="absolute right-7 bottom-2"/>
  <Image src="/_static/emojis/grinning_face_3d.png" width="100" height="100" className="absolute left-7 bottom-20"/>
  <Image src="/_static/emojis/slightly_smiling_face_3d.png" width="100" height="100" className="absolute right-1 top-7"/>


</div>

      <h2 className="font-display text-xl font-bold leading-[1.15] text-gray-800 sm:text-6xl sm:leading-[1.15]">
      Sentiment Analysis <Badge>Soon</Badge>
      </h2>
      <p className="max-w-lg">With the help of AI, you will have the ability to experience how your day was or that thought you had during the day.</p>
    </div>
  )
}

export default SentimentAnalysis
