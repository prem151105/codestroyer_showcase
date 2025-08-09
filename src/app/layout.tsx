import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Anurag Jayaswal - Terminal Portfolio',
  description: 'Interactive terminal-style portfolio showcasing AI/ML expertise and software development skills',
  keywords: 'AI, Machine Learning, Software Developer, Terminal, Portfolio, React, Next.js, Anurag Jayaswal, IIIT Bhagalpur, Competitive Programming',
  authors: [{ name: 'Anurag Jayaswal' }],
  creator: 'Anurag Jayaswal',
  publisher: 'Anurag Jayaswal',
  metadataBase: new URL('https://anurag-terminal-portfolio.vercel.app'),
  icons: {
    icon: '/terminal-icon.svg',
    shortcut: '/terminal-icon.svg',
    apple: '/terminal-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anurag-terminal-portfolio.vercel.app',
    title: 'Anurag Jayaswal - Terminal Portfolio',
    description: 'Interactive terminal-style portfolio showcasing AI/ML expertise and competitive programming achievements',
    siteName: 'Anurag Jayaswal Portfolio',
    images: [
      {
        url: '/terminal-icon.svg',
        width: 1200,
        height: 630,
        alt: 'Anurag Jayaswal Terminal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anurag Jayaswal - Terminal Portfolio',
    description: 'Interactive terminal-style portfolio showcasing AI/ML expertise',
    images: ['/terminal-icon.svg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  )
}