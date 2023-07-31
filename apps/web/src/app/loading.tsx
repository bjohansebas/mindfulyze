import { CircularProgress } from '@mui/material'
import { Banner } from '../components/Banner'

export const Loading = (): JSX.Element => {
  return (
    <div className='min-h-screen w-full flex relative bg-gradient-to-r from-main-900 to-main-950 justify-center items-center flex-col'>
      <CircularProgress sx={{ color: '#EBF3F0' }} />
      <div className='absolute bottom-[100px] text-white'>
        <Banner />
      </div>
    </div>
  )
}

export default Loading
