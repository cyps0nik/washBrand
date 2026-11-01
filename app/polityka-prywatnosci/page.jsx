import { politykaPrywatnosci, firma } from '../../data/content';

export const metadata = {
    title: politykaPrywatnosci.tytul,
    description: `Jak ${firma.nazwa} przetwarza dane osobowe przekazane przez stronę i formularz wyceny.`,
    alternates: { canonical: '/polityka-prywatnosci' },
};

export default function PolitykaPrywatnosciPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Nagłówek podstrony */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{politykaPrywatnosci.tytul}</h1>
                    <p className="text-gray-500">Ostatnia aktualizacja: {politykaPrywatnosci.aktualizacja}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed">
                    <p>{politykaPrywatnosci.wstep}</p>

                    {/* Administrator – dane wyciągane z obiektu firma w content.js */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Administrator danych</h2>
                        <p>
                            Administratorem Twoich danych osobowych jest {firma.wlasciciel ? `${firma.wlasciciel}, działalność gospodarcza pod nazwą ` : ''}
                            {firma.nazwa}, {firma.miasto}, NIP: {firma.nip}.
                        </p>
                        <p className="mt-2">
                            Kontakt w sprawie danych: e-mail{' '}
                            <a href={`mailto:${firma.email}`} className="text-blue-700 underline break-all">{firma.email}</a>, telefon{' '}
                            <a href={`tel:${firma.telefon.replace(/\s/g, '')}`} className="text-blue-700 underline whitespace-nowrap">{firma.telefon}</a>.
                        </p>
                    </section>

                    {politykaPrywatnosci.sekcje.map((sekcja) => (
                        <section key={sekcja.id}>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">{sekcja.naglowek}</h2>
                            <div className="space-y-2">
                                {sekcja.akapity.map((akapit, i) => (
                                    <p key={i}>{akapit}</p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
}
