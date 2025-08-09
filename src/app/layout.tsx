import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Anurag Jayaswal - AI/ML Developer | IIIT Bhagalpur | Available for SDE Roles',
  description: 'Professional AI/ML Developer & Computer Science student seeking SDE opportunities. Expert in Python, LLM systems, competitive programming (LeetCode 1500+, Codeforces Specialist). Ready to contribute to innovative tech teams.',
  keywords: [
    'Anurag Jayaswal', 'AI Developer', 'ML Engineer', 'Software Engineer', 
    'IIIT Bhagalpur', 'Competitive Programming', 'LeetCode Expert', 'Codeforces Specialist',
    'Python Developer', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'NLP',
    'Multi-Agent Systems', 'SDE Jobs', 'AI Jobs', 'Fresh Graduate', 'Available for Hire',
    'Terminal Portfolio', 'Interactive Resume', 'Gwalior MP', 'India'
  ].join(', '),
  authors: [{ name: 'Anurag Jayaswal', url: 'https://linkedin.com/in/anurag-jayaswal' }],
  creator: 'Anurag Jayaswal',
  publisher: 'Anurag Jayaswal',
  category: 'Technology',
  metadataBase: new URL('https://anurag-portfolio.vercel.app'),
  icons: {
    icon: '/terminal-icon.svg',
    shortcut: '/terminal-icon.svg',
    apple: '/terminal-icon.svg',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://anurag-portfolio.vercel.app',
    title: 'Anurag Jayaswal - AI/ML Developer | Available for SDE Roles',
    description: '🚀 Professional AI/ML Developer from IIIT Bhagalpur seeking SDE opportunities. Expert in Python, LLM systems, competitive programming (LeetCode 1500+). Ready to innovate with your team!',
    siteName: 'Anurag Jayaswal - Professional Portfolio',
    images: [
      {
        url: '/terminal-icon.svg',
        width: 1200,
        height: 630,
        alt: 'Anurag Jayaswal - AI/ML Developer Portfolio | Interactive Terminal Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anurag Jayaswal - AI/ML Developer | Seeking SDE Roles',
    description: '🚀 Interactive portfolio showcasing AI/ML expertise, competitive programming achievements, and real-world project impact. Currently available for opportunities!',
    images: ['/terminal-icon.svg'],
    creator: '@anuragj7879',
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