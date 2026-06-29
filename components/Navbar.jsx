import Link from 'next/link';
import { firma } from '../data/content';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="font-bold text-xl text-blue-700">
                            {firma.nazwa}
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#uslugi" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Usługi</a>
                        <Link href="/produkty" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Produkty</Link>
                        <a href="#kontakt" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Kontakt</a>
                    </div>
                    <div className="flex items-center">
                        <a
                            href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold transition-colors"
                        >
                            Zadzwoń
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}