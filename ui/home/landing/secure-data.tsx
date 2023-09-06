import { ShieldCheckIcon } from '@heroicons/react/24/solid'

const SecureData = () => {
  return (
    <div className="gap-4 mx-auto max-w-lg px-4 text-center sm:max-w-4xl flex justify-between items-center pb-16 pt-8 flex-col sm:flex-row">
      <div className="">
        <ShieldCheckIcon className="sm:w-48 sm:h-48 w-32 h-32" />
      </div>
      <div className="max-w-md gap-3 flex flex-col">
        <h2 className="font-display text-xl font-bold leading-[1.15] text-gray-800 sm:text-6xl sm:leading-[1.15]">
          Write safely
        </h2>
        <p>
          Using AES-256 encryption, your personal diary is securely protected. Only you can decrypt and access them,
          ensuring that no one else
        </p>
      </div>
    </div>
  )
}

export default SecureData
