import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chat Session Feedback",
  description: "Rate your chat experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50">
        <footer className="text-center py-4 text-sm text-gray-500">
          <Link href="/admin/enterprises" className="hover:text-primary">
            Admin Panel
          </Link>
        </footer>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
