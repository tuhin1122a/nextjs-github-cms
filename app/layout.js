import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub CMS",
  description: "Content Management System powered by GitHub and Next.js",
  keywords: ["cms", "github", "nextjs", "markdown", "content management"],
  authors: [{ name: "Your Name" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div className="min-h-full bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      GitHub CMS
                    </span>
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="/"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="/dashboard"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
