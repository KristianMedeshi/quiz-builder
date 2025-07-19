import './globals.css';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-start">
            <h1 className="text-xl font-bold text-blue-600 tracking-wide">Quiz Builder</h1>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}