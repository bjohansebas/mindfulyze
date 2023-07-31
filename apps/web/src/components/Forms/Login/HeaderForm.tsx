import { Banner } from '@/components/Banner'

export function HeaderFormLogin(): JSX.Element {
  return (
    <header className='flex items-center gap-6 flex-col text-white'>
      <Banner widthFavicon={40} heightText={24.26} widthText={230} />
      <div className='w-full px-2 gap-2 flex flex-col'>
        <h1 className='text-3xl font-extrabold'>Log in</h1>
        <h2 className='text-xl font-semibold'>Welcome back! Please enter your details.</h2>
      </div>
    </header>
  )
}
