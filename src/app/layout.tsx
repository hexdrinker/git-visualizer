import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'Git Visualizer',
  description: 'Git의 핵심 개념들을 시각적으로 학습하는 인터랙티브 가이드',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='ko'
      suppressHydrationWarning
    >
      <body className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased'>
        <ThemeProvider
          defaultTheme='system'
          storageKey='git-visualizer-theme'
        >
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
