import { firma } from '../data/content';

export default function Kontakt() {
    return (
        <section id="kontakt" className="py-20 bg-blue-600 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Gotowy na lśniącą kostkę i elewację?</h2>
                <p className="text-xl text-blue-100 mb-10">
                    Zadzwoń do nas lub napisz, aby umówić się na darmową wycenę. <br className="hidden md:block" />
                    Zakup naszych produktów możliwy jest również bezpośrednio przez telefon.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a
                        href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                        className="bg-white text-blue-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        📞 {firma.telefon}
                    </a>
                    <a
                        href={`mailto:${firma.email}`}
                        className="bg-blue-800 text-white hover:bg-blue-900 border border-blue-500 font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        ✉️ Napisz do nas
                    </a>
                </div>
            </div>
        </section>
    );
}