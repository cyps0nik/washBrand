import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PasekMobilny from '../components/PasekMobilny';
import { analityka, dostepnosc, firma, seo } from '../data/content';
import { adresStrony } from '../lib/adresStrony';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Czcionka z polskimi znakami (latin-ext), wczytywana lokalnie przez Next.js – bez skoków układu
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL(adresStrony),
  title: {
    default: seo.tytul,
    template: `%s | ${firma.nazwa}`, // podstrony: „Polityka prywatności | Eco-Power"
  },
  description: seo.opis,
  applicationName: firma.nazwa,
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: firma.nazwa,
    title: seo.tytul,
    description: seo.opis,
    images: [{ url: seo.obrazek, alt: firma.nazwa }],
  },
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
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-blue-700 focus:font-bold focus:px-4 focus:py-3 focus:rounded-md focus:shadow-lg"
      >
        {dostepnosc.przejdzDoTresci}
      </a>
      <Navbar />
      <main id="tresc" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <Footer />
      <PasekMobilny />
      {/* Skrypt ręczny tylko z tokenem; przy automatycznej konfiguracji Cloudflare wstawia go sam */}
      {analityka.wlaczona && analityka.token && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: analityka.token })}
        />
      )}
      </body>
      </html>
  );
}