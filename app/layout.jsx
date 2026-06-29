import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css'; // Zakładam, że tu jest standardowy konfig Tailwind z Next.js

export const metadata = {
  title: 'Mycie Bruku Kowalski | Kostka i Elewacje',
  description: 'Profesjonalne mycie kostki brukowej i elewacji.',
};

export default function RootLayout({ children }) {
  return (
      <html lang="pl" className="scroll-smooth">
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