import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Formulario Altamirano Floristas',
  description: 'Formulario de contacto para Altamirano Floristas',
  icons: {
    icon: 'https://altamiranofloristas.com/wp-content/uploads/2024/10/LogoVertical.svg',
    shortcut: 'https://altamiranofloristas.com/wp-content/uploads/2024/10/LogoVertical.svg',
    apple: 'https://altamiranofloristas.com/wp-content/uploads/2024/10/LogoVertical.svg',
  },
  openGraph: {
    title: 'Formulario Altamirano Floristas',
    description: 'Formulario de contacto para Altamirano Floristas',
    url: 'https://formulario.altamiranofloristas.com',
    siteName: 'Formulario Altamirano Floristas',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
