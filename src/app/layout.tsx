import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tauri + Next.js + TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={classNames({
          [inter.className]: true,
          'h-screen w-screen bg-slate-50': true,
        })}
      >
        <main className="flex min-h-full min-w-full flex-row">
          <section className="border-r border-slate-200 p-1">
            <Navigation />
          </section>
          <section className="flex flex-1 flex-col items-start gap-2 bg-white p-1">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
