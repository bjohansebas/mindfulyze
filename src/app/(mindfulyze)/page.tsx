import CTA from '@/components/home/landing/cta'
import Hero from '@/components/home/landing/hero'
import { SecureDataPreview } from '@/components/home/landing/secure-data'
import { ShieldCheckIcon, StarIcon } from '@heroicons/react/24/solid'
import { Badge } from '@ui/badge'
import { LayoutTemplateIcon } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <header className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center tracking-tighter">
          Store moments from your day
          <br />
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Securely
          </span>
        </h1>
        <h2 className="mt-6 text-lg text-slate-300 text-center max-w-2xl mx-auto">
          Capture, express, and reflect on your day in a secure and private space. Start your journey of self-expression
          and personal growth
        </h2>
        <Hero />
      </header>
      <section className="mt-20 sm:mt-24 flex flex-col items-center justify-center gap-10">
        <SecureDataPreview />
      </section>
      <div className="mt-20 sm:mt-24 p-10 grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
        <section className="col-span-2 md:col-span-1">
          <header className="flex flex-col gap-6 items-center p-5">
            <LayoutTemplateIcon className="w-32 h-32" />
            <h2 className="text-center text-4xl font-bold text-primary-600">Create your notes super fast</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              With the help of templates, you will have the ease of starting to write a journal and reflect on the
              things that matter most.
            </p>
          </header>
        </section>
        <section className="col-span-2 md:col-span-1">
          <header className="flex flex-col gap-6 items-center p-5">
            <ShieldCheckIcon className="w-32 h-32" />
            <h2 className="text-center text-4xl font-bold text-primary-600">Write safely</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              Using AES-256 encryption, your personal diary is securely protected. Only you can decrypt and access them,
              ensuring that no one else
            </p>
          </header>
        </section>
        <section className="relative col-span-2 w-full h-full flex justify-center flex-col items-center">
          <Image
            src="/_static/emojis/disappointed_face_3d.png"
            width="100"
            height="100"
            className="absolute left-4 top-3 hidden md:inline"
            alt="Disappointed Face"
          />
          <Image
            src="/_static/emojis/frowning_face_3d.png"
            width="100"
            height="100"
            className="absolute right-7 bottom-2 hidden md:inline"
            alt="Frowning face"
          />
          <Image
            src="/_static/emojis/grinning_face_3d.png"
            width="100"
            height="100"
            className="absolute left-7 bottom-20 hidden md:inline"
            alt="Grinning face"
          />
          <Image
            src="/_static/emojis/slightly_smiling_face_3d.png"
            width="100"
            height="100"
            className="absolute right-1 top-7 hidden md:inline"
            alt="Slightly smiling face"
          />
          <header className="max-w-2xl px-10 flex flex-col gap-6 items-center">
            <div className="relative w-40">
              <StarIcon className="w-32 h-32 fill-purple-800" />
              <StarIcon className="w-20 h-20 -top-7 -left-7 absolute fill-purple-500" />
            </div>
            <h2 className=" text-center text-4xl font-bold text-primary-600">
              Sentiment Analysis <Badge>Soon</Badge>
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              With the help of AI, you will have the ability to experience how your day was or that thought you had
              during the day.
            </p>
          </header>
        </section>
      </div>
      <CTA />
    </>
  )
}
