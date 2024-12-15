import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Header from './components/header'
import Footer from './components/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name - Personal Website',
  description: 'Personal website of Your Name, showcasing projects, blog, and professional experience.',
  openGraph: {
    title: 'Your Name - Personal Website',
    description: 'Personal website of Your Name, showcasing projects, blog, and professional experience.',
    url: 'https://yourwebsite.com',
    siteName: 'Your Name',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Your Name - Personal Website',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

