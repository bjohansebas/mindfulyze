import { Banner } from 'components/Banner'

export function HeaderFormNewProfile(): JSX.Element {
  return (
    <header className='flex items-center gap-6 flex-col'>
      <Banner widthFavicon={40} heightText={24.26} widthText={230} />
      <div className='w-full px-2 gap-2 flex flex-col'>
        <h1 className='text-3xl font-extrabold'>Thank you for joining Mindfulyze.</h1>
        <h2 className='text-xl font-semibold'>
          Start your new path of emotional control! Begin managing your emotions and transform your life.
        </h2>
      </div>
    </header>
  )
}
