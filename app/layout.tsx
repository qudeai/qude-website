import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'QudeAI Framework',
  description: 'Your AI-powered CLI Copilot on Solana',
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/docg651du/image/upload/v1736315070/qude_logo_bmpqiw.jpg',
        sizes: '32x32',
      },
      {
        url: 'https://res.cloudinary.com/docg651du/image/upload/v1736315070/qude_logo_bmpqiw.jpg',
        sizes: '16x16',
      }
    ],
    apple: {
      url: 'https://res.cloudinary.com/docg651du/image/upload/v1736315070/qude_logo_bmpqiw.jpg',
      sizes: '180x180',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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



import './globals.css'