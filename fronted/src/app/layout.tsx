import React from 'react'
import { Inconsolata } from 'next/font/google'
import App from './app'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export const metadata = {
  title: 'Team Management',
  description: ''
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props): React.ReactElement {
  return (
    <html lang="en">
      <body className={inconsolata.className} suppressHydrationWarning={true}>
        <App>
          {children}
        </App>
      </body>
    </html>
  )
}
