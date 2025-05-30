import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import TanQueryClientProvider from '@/providers/query-client-provider'
import { SessionProvider } from '@/providers/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <TanQueryClientProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </TanQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
