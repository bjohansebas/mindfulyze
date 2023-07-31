import { Banner } from '@/components/Banner'

export function HeaderFormSignUp(): JSX.Element {
  return (
    <header className='flex items-center gap-6 flex-col'>
      <Banner widthFavicon={40} heightText={24.26} widthText={230} />
      <div className='w-full px-2 gap-2 flex flex-col'>
        <h1 className='text-3xl font-extrabold'>Sign Up</h1>
        <h2 className='text-xl font-semibold'>Sign up now and begin your journey of self-discovery!</h2>
      </div>
    </header>
  )
}
