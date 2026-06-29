import { produkty, firma } from '../../data/content';

// Optymalizacja SEO dla podstrony
export const metadata = {
    title: `Produkty | ${firma.nazwa}`,
    description: 'Profesjonalne środki czyszczące i impregnaty do kostki brukowej oraz elewacji.',
};

export default function ProduktyPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Nagłówek sekcji */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Nasze Produkty</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Oferujemy sprawdzoną chemię i preparaty, których sami używamy na co dzień podczas realizacji zleceń.
                    </p>
                </div>

                {/* Ważna informacja o sposobie zamawiania */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg shadow-sm max-w-3xl mx-auto">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Jak zamawiać?</h3>
                    <p className="text-blue-800 mb-4">
                        Zamówienia przyjmujemy bezpośrednio przez telefon lub wiadomość e-mail. Skontaktuj się z nami, a przygotujemy Twoje zamówienie do odbioru lub ustalimy szczegóły dostawy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                            className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-blue-100 font-bold py-2 px-6 rounded-full shadow-sm transition-colors"
                        >
                            📞 {firma.telefon}
                        </a>
                        <a
                            href={`mailto:${firma.email}`}
                            className="inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-6 rounded-full shadow-sm transition-colors"
                        >
                            ✉️ Wyślij email
                        </a>
                    </div>
                </div>

                {/* Siatka produktów */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {produkty.map((produkt) => (
                        <div key={produkt.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">

                            <div className="flex justify-between items-start mb-4 gap-4">
                                <h2 className="text-xl font-bold text-gray-900">{produkt.nazwa}</h2>
                                {/* Logika odznaki: Jeśli dostepnosc to true -> zielony, jeśli false -> czerwony */}
                                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                    produkt.dostepnosc
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                  {produkt.dostepnosc ? 'Dostępny' : 'Brak'}
                </span>
                            </div>

                            <p className="text-gray-600 flex-grow mb-6">{produkt.opis}</p>

                            <div className="text-2xl font-black text-blue-700 border-t border-slate-100 pt-4 mt-auto">
                                {produkt.cena}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}