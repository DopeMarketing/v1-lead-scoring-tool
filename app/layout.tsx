import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'V1 Lead Scoring Tool',
  description: 'Advanced lead scoring and qualification platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900">V1 Lead Scoring</h1>
                </div>
                <nav className="flex items-center space-x-4">
                  <a href="/login" className="text-sm text-gray-500 hover:text-gray-700">Login</a>
                  <a href="/signup" className="text-sm bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">Sign Up</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}