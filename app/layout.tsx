import '../styles/globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Stand Mitigation Engine',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="p-6 space-y-4 text-white bg-gray-800 w-50">
          <h2 className="text-xl font-semibold">Stand Mitigation POC</h2>
          <nav className="mt-4 space-y-2">
            <Link href="/" className="block hover:underline">
              🏠 Home
            </Link>
            <Link href="/evaluate" className="block hover:underline">
              🔥 Evaluate Property
            </Link>
            <Link href="/admin" className="block hover:underline">
              ⚙️ Administer Rules
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  )
}
