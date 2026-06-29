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