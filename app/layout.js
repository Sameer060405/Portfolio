import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata = {
  title: 'Sameer Kaushik | Full Stack & AI Developer',
  description:
    'Full Stack Developer · AI Engineer · Building fast, intelligent systems at the intersection of software and machine learning.',
  keywords: ['Sameer Kaushik', 'Portfolio', 'Full Stack Developer', 'AI Engineer', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Sameer Kaushik' }],
  openGraph: {
    title: 'Sameer Kaushik | Portfolio',
    description: 'Full Stack Developer & AI Engineer',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} noise`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
