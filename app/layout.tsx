import type { Metadata } from 'next'
import './globals.css'
import "@/app/globals.css";

export const metadata: Metadata = {
  title: 'Re-Dish',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
