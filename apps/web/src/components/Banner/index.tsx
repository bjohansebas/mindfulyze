import { ReactComponent as LogoIcon } from 'assets/favicon.svg'
import { ReactComponent as TextLogo } from 'assets/text.svg'

export interface BannerProps {
  heightText?: number
  widthText?: number
  widthFavicon?: number
}

export const Banner = ({ heightText = 14.52, widthFavicon = 32, widthText = 140 }: BannerProps): JSX.Element => {
  return (
    <div className='flex h-full items-center gap-2'>
      <LogoIcon width={widthFavicon} height={widthFavicon} className='fill-current' title='favicon' />
      <TextLogo height={heightText} width={widthText} className='fill-current' title='text-logo' />
    </div>
  )
}
