import {Inter} from 'next/font/google'
import {Metadata} from 'next'
import Header from './components/header'
import Footer from './components/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Petru Rares Sincraian - Personal Website',
  description: 'Personal website of Petru Rares Sincraian, showcasing projects, blog, and professional experience.',
  openGraph: {
    title: 'Petru Rares Sincraian - Personal Website',
    description: 'Personal website of Petru Rares Sincraian, showcasing projects, blog, and professional experience.',
    url: 'https://petru.tech',
    siteName: 'Petru Rares Sincraian',
    images: [
      {
        url: 'https://petru.tech/me.jpeg',
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
    title: 'Petru Rares Sincraian - Personal Website',
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

