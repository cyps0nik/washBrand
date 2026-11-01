import Link from 'next/link';
import { firma, strona404 } from '../data/content';

export const metadata = {
    title: strona404.naglowek,
};

export default function NotFound() {
    return (
        <div className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{strona404.naglowek}</h1>
                <p className="text-xl text-gray-600 mb-10">{strona404.opis}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all">
                        {strona404.przycisk}
                    </Link>
                    <a
                        href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                        className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-lg shadow-sm transition-all"
                    >
                        📞 {firma.telefon}
                    </a>
                </div>
            </div>
        </div>
    );
}
