import { firma } from '../data/content';

export default function Footer() {
    const rok = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">{firma.nazwa}</h3>
                    <p className="text-gray-400">Profesjonalne czyszczenie elewacji i kostki brukowej.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                    <p className="text-gray-400">Tel: {firma.telefon}</p>
                    <p className="text-gray-400">Email: {firma.email}</p>
                    <p className="text-gray-400">{firma.miasto}</p>
                    {firma.facebook && (
                        <a
                            href={firma.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-blue-500 hover:text-blue-400 font-medium transition-colors"
                        >
                            {/* Ikonka SVG Facebooka */}
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                            <span>Nasz profil na Facebooku</span>
                        </a>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Informacje</h3>
                    <p className="text-gray-400">NIP: {firma.nip}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
                &copy; {rok} {firma.nazwa}. Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}