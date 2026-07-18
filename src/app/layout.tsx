import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
