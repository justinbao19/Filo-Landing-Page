import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Filo - Inbox to Done',
  description:
    'Turn overwhelming emails into crystal-clear summaries, quick replies and AI-generated to-dos in one sec.',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon-16.png',
    apple: '/favicon-48.png',
  },
  openGraph: {
    title: 'Filo - Inbox to Done',
    description:
      'Turn overwhelming emails into crystal-clear summaries, quick replies and AI-generated to-dos in one sec.',
    siteName: 'Filo',
    type: 'website',
    url: 'https://www.filomail.com/',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Filo - Inbox to Done' },
    ],
  },
  twitter: {
    site: '@Filo_Mail',
    title: 'Filo - Inbox to Done',
    creator: '@Filo_Mail',
    card: 'summary_large_image',
    description: 'Turn overwhelming emails into crystal-clear summaries, quick replies and AI-generated to-dos in one sec.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Filo - Inbox to Done' },
    ],
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.className} ${geistMono.className} ${inter.className} overflow-y-auto overflow-x-hidden antialiased w-svw h-svh`}
      >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
