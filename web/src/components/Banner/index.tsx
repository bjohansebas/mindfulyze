import { Box, SvgIcon } from '@mui/material'

import { Link } from 'react-router-dom'

import { ReactComponent as LogoIcon } from 'assets/favicon.svg'
import { ReactComponent as TextLogo } from 'assets/text.svg'

export interface BannerProps {
  heightText?: number,
  widthText?: number
  widthFavicon?: number
}

export function Banner({  heightText = 14.52, widthFavicon = 32, widthText = 140 }: BannerProps): JSX.Element {

  return (
    <Box component={Link} sx={{ display: 'flex', height: '100%', alignItems: 'center', gap: '8px' }} to="/">
      <SvgIcon sx={{ height: widthFavicon, width: widthFavicon }} viewBox='0 0 32 32'>
        <LogoIcon></LogoIcon>
      </SvgIcon>
      <TextLogo style={{ height: heightText, width: widthText }}></TextLogo>
    </Box>
  )
}