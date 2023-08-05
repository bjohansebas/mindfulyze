import { CircularProgress } from '@nextui-org/react'

import { Banner } from '../components/Banner'

export const Loading = (): JSX.Element => {
  return (
    <div className='min-h-screen w-full flex relative justify-center items-center flex-col'>
      <CircularProgress aria-label='Loading...' size='lg' color='primary' />
      <div className='absolute bottom-[100px] text-primary-900'>
        <Banner />
      </div>
    </div>
  )
}

export default Loading
