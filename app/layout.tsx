

import '../styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Stand Mitigation Engine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-50 bg-gray-800 text-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">Stand Mitigation POC</h2>
          <nav className="space-y-2 mt-4">
            <Link href="/" className="block hover:underline">🏠 Home</Link>
            <Link href="/evaluate" className="block hover:underline">🔥 Evaluate Property</Link>
            <Link href="/admin" className="block hover:underline">⚙️ Administer Rules</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  );
}
