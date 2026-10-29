import { opinie, opinieSekcja } from '../data/content';

export default function Opinie() {
    // Bez opinii sekcja się nie pokazuje (nie wyświetlamy pustego miejsca)
    if (!opinie || opinie.length === 0) return null;

    return (
        <section id="opinie" className="py-16 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">{opinieSekcja.naglowek}</h2>
                    <p className="mt-4 text-lg text-gray-600">{opinieSekcja.opis}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opinie.map((opinia) => {
                        const gwiazdki = Math.min(Math.max(Math.round(opinia.ocena || 5), 1), 5);
                        return (
                            <figure key={opinia.id} className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
                                <div className="text-amber-400 text-xl mb-3" aria-label={`Ocena: ${gwiazdki} na 5`}>
                                    {'★'.repeat(gwiazdki)}
                                    <span className="text-slate-300">{'★'.repeat(5 - gwiazdki)}</span>
                                </div>
                                <blockquote className="text-gray-700 flex-grow">„{opinia.tresc}”</blockquote>
                                <figcaption className="mt-4 font-semibold text-gray-900">
                                    {opinia.imie}
                                    {opinia.miejscowosc && <span className="font-normal text-gray-500">, {opinia.miejscowosc}</span>}
                                </figcaption>
                            </figure>
                        );
                    })}
                </div>

                {opinieSekcja.link && (
                    <div className="text-center mt-10">
                        <a
                            href={opinieSekcja.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 font-bold underline hover:text-blue-800"
                        >
                            {opinieSekcja.linkTekst}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
