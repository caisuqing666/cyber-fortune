import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '赛博问卜 - 帮你把状态骂清楚',
  description: '不算命，不鸡汤，只负责把你最近的状态说清楚，顺便骂醒你。',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#080b12',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans">
        <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6 sm:p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
