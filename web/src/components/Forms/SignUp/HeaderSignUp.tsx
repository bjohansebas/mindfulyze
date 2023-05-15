import { Box, Typography } from "@mui/material";

import { Banner } from "@/components/Banner";

export function HeaderFormSignUp() {
  return (
    <Box component="header" sx={{ display: 'flex', alignItems: 'center', gap: '24px', flexDirection: 'column' }}>
      <Box>
        <Banner widthFavicon={40} heightText={24.26} widthText={230} />
      </Box>
      <Box sx={{ width: '100%', px: '8px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant='h1'
          color="primary.dark"
          sx={{ fontSize: { md: '2.143rem', xs: '1.714rem' }, fontWeight: '600', lineHeight: '120%' }}>
          Sign Up
        </Typography>
        <Typography
          variant='h2'
          color="primary"
          sx={{ fontSize: '1.143rem', fontWeight: '600', lineHeight: '120%' }}>
          Sign up now and begin your journey of self-discovery!
        </Typography>
      </Box>
    </Box>
  )
}