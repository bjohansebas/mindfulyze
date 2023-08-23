import '@/styles/globals.css'

import { Poppins } from 'next/font/google'

import { constructMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { Provider } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={cn(poppins.variable)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
