import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from './context/LanguageContext'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ramadan Companion',
  description: 'Your personal Ramadan companion with prayer times, countdown, and spiritual guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="fixed bottom-0 w-full bg-white/5 backdrop-blur-sm py-2 text-center text-sm text-white/60">
            © {new Date().getFullYear()} Agan Haziri
          </footer>
        </LanguageProvider>
      </body>
    </html>
  )
} 