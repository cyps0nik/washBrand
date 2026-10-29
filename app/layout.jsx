import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PasekMobilny from '../components/PasekMobilny';
import { Inter } from 'next/font/google';
import './globals.css';

// Czcionka z polskimi znakami (latin-ext), wczytywana lokalnie przez Next.js – bez skoków układu
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'ECO-POWER | Elewacje i Fotowoltaika',
  description: 'Profesjonalne mycie kostki brukowej i elewacji.',
    icons: {
        icon: [
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
      <html lang="pl" className={`${inter.variable} scroll-smooth scroll-pt-20`} data-scroll-behavior="smooth">
      <body className="font-sans bg-white text-gray-900 antialiased flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <PasekMobilny />
      </body>
      </html>
  );
}