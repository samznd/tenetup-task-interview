import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services app using Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
