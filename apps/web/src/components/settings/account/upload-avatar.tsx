'use client'

import { Button, toast } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

import { UploadCloud } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function UploadAvatar() {
  const { data: session } = useSession()

  const [image, setImage] = useState<string | null>()

  useEffect(() => {
    console.log(session?.user)
    if (image == null) {
      setImage(session?.user?.image || null)
    }
  }, [session, image])

  const [dragActive, setDragActive] = useState(false)

  const onChangePicture = useCallback(
    (e) => {
      const file = e.target.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 2) {
          toast.error('File size too big (max 2MB)')
        } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
          toast.error('File type not supported (.png or .jpg only)')
        } else {
          const reader = new FileReader()
          reader.onload = (e) => {
            setImage(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setImage],
  )

  const [uploading, setUploading] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        setUploading(true)

        e.preventDefault()

        const res = await fetch('/api/user/avatar', {
          method: 'PUT',
          body: JSON.stringify({ data: image }),
        })

        setUploading(false)

        if (!res.ok) {
          toast.error('Something went wrong')
          return
        }

        const { data } = (await res.json()) as { data: string }

        if (data != null) {
          toast.success('Successfully updated your profile picture!')
        } else {
          toast.error('Something went wrong')
        }
      }}
      className="space-y-8 md:w-72"
    >
      <div className="space-y-2">
        <p className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Your Avatar
        </p>
        <div>
          <label
            htmlFor="image"
            className="group relative mt-1 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
          >
            <div
              className="absolute z-[5] h-full w-full rounded-full"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(true)
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragActive(false)
                const file = e.dataTransfer.files?.[0]
                if (file) {
                  if (file.size / 1024 / 1024 > 2) {
                    toast.error('File size too big (max 2MB)')
                  } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                    toast.error('File type not supported (.png or .jpg only)')
                  } else {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      setImage(e.target?.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }
              }}
            />
            <div
              className={cn(
                'absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-full bg-white transition-all',
                {
                  'cursor-copy border-2 border-black bg-gray-50 opacity-100': dragActive,
                  'opacity-0 group-hover:opacity-100': image,
                  'group-hover:bg-gray-50': !image,
                },
              )}
            >
              <UploadCloud
                className={cn(
                  'h-5 w-5 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95',
                  {
                    'scale-110': dragActive,
                    'scale-100': !dragActive,
                  },
                )}
              />
            </div>
            {image ? (
              <Image
                src={image}
                alt="Preview"
                width={96}
                height={96}
                className="h-full w-full rounded-full object-cover"
              />
            ) : null}
          </label>
          <div className="mt-1 flex rounded-full shadow-sm">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChangePicture}
            />
          </div>
        </div>
        <p className="text-[0.8rem] text-muted-foreground">
          Square image recommended. Accepted file types: .png, .jpg. Max file size: 2MB.
        </p>
      </div>
      <Button disabled={uploading || !image || session?.user?.image === image}>Save changes</Button>
    </form>
  )
}
