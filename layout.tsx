import { Metadata } from 'next'
import { ThemeProvider } from './components/theme-provider'

export const metadata: Metadata = {
  title: 'QudeAI Framework',
  description: 'Your AI-powered CLI Copilot on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

