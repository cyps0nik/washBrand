import { uslugi } from '../data/content';

export default function Uslugi() {
    return (
        <section id="uslugi" className="py-16 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Nasze usługi</h2>
                    <p className="mt-4 text-lg text-gray-600">Profesjonalne czyszczenie z wykorzystaniem najlepszego sprzętu</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {uslugi.map((usluga) => (
                        <div key={usluga.id} className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">{usluga.ikona}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{usluga.nazwa}</h3>
                            <p className="text-gray-600 mb-6">{usluga.opis}</p>
                            <div className="font-bold text-blue-700 text-lg border-t border-slate-200 pt-4">
                                {usluga.cena}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}