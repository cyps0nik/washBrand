import { hero, firma } from '../data/content';

export default function Hero() {
    return (
        <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                    {hero.naglowek}
                </h1>
                <p className="text-xl text-gray-600 mb-10">
                    {hero.podtytul}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
                    >
                        {hero.przyciskGlosny}
                    </a>
                    <a
                        href="#uslugi"
                        className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-lg shadow-sm transition-all"
                    >
                        {hero.przyciskCichy}
                    </a>
                </div>

                {/* Atuty – krótkie hasła budujące zaufanie */}
                {hero.atuty?.length > 0 && (
                    <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm sm:text-base font-semibold text-gray-700">
                        {hero.atuty.map((atut) => (
                            <li key={atut} className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {atut}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}