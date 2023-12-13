import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
