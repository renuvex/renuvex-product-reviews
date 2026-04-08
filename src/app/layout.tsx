import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔗</text></svg>" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: '"Twemoji Country Flags", Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgb(18, 25, 38)',
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(227, 232, 239)',
                borderRadius: '8px',
                boxShadow: '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
                padding: '9px 12px',
              },
              classNames: {
                icon: 'text-[rgb(18,183,106)]',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}