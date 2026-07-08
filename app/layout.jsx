import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css'; // Zakładam, że tu jest standardowy konfig Tailwind z Next.js

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
      <html lang="pl" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-white text-gray-900 antialiased flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      </body>
      </html>
  );
}