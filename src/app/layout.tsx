import '../styles/global.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mind Test',
  description: 'Sistema de gerenciamento de entrada e saidas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
