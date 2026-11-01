import Image from 'next/image';
import Link from 'next/link';
import { firma, podstronyUslugTeksty as teksty } from '../../../data/content';
import { adresStrony } from '../../../lib/adresStrony';
import { adresPodstrony, uslugiZPodstrona } from '../../../lib/podstronyUslug';

// Plik budowany tylko, gdy włączona jest choć jedna podstrona usługi (patrz next.config.mjs)
export const dynamicParams = false;

const znajdz = (adres) => uslugiZPodstrona.find((usluga) => usluga.podstrona.adres === adres);

export function generateStaticParams() {
    return uslugiZPodstrona.map((usluga) => ({ adres: usluga.podstrona.adres }));
}

export async function generateMetadata({ params }) {
    const { adres } = await params;
    const usluga = znajdz(adres);
    return {
        title: `${usluga.nazwa} – ${firma.miejscowosc} i okolice`,
        description: usluga.podstrona.opisSeo || usluga.opis,
        alternates: { canonical: adresPodstrony(usluga) },
    };
}

function Lista({ naglowek, elementy }) {
    if (elementy.length === 0) return null;
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{naglowek}</h2>
            <ul className="list-disc pl-5 space-y-2">
                {elementy.map((element) => (
                    <li key={element}>{element}</li>
                ))}
            </ul>
        </section>
    );
}

export default async function UslugaPage({ params }) {
    const { adres } = await params;
    const usluga = znajdz(adres);
    const { wstep, kroki, wCenie, czegoNieRobimy, informacje, miejscowosci, pytania, zdjecia } = usluga.podstrona;

    // Dane dla Google: usługa i pytania z tej podstrony
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": usluga.nazwa,
            "description": usluga.podstrona.opisSeo || usluga.opis,
            "url": `${adresStrony}${adresPodstrony(usluga)}`,
            "areaServed": firma.obszar.map((miejscowosc) => ({ "@type": "City", "name": miejscowosc })),
            "provider": { "@type": "LocalBusiness", "name": firma.nazwa, "telephone": firma.telefon, "url": adresStrony },
        },
        ...(pytania.length > 0 ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": pytania.map((element) => ({
                "@type": "Question",
                "name": element.pytanie,
                "acceptedAnswer": { "@type": "Answer", "text": element.odpowiedz },
            })),
        }] : []),
    ];

    return (
        <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <div className="max-w-3xl mx-auto">
                <Link href="/#uslugi" className="inline-flex items-center min-h-11 text-blue-700 font-semibold underline">
                    {teksty.wrocDoUslug}
                </Link>

                <h1 className="text-4xl font-extrabold text-gray-900 mt-4 mb-4">
                    {usluga.nazwa} – {firma.miejscowosc} i okolice
                </h1>
                <p className="text-xl font-bold text-blue-700 mb-8">{usluga.cena}</p>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 space-y-8 text-gray-700 leading-relaxed">
                    <p>{wstep}</p>

                    <Lista naglowek={teksty.kroki} elementy={kroki} />
                    <Lista naglowek={teksty.wCenie} elementy={wCenie} />
                    <Lista naglowek={teksty.czegoNieRobimy} elementy={czegoNieRobimy} />
                    <Lista naglowek={teksty.informacje} elementy={informacje} />

                    {miejscowosci.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{teksty.miejscowosci}</h2>
                            <p>{miejscowosci.join(', ')}</p>
                        </section>
                    )}

                    {zdjecia.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{teksty.zdjecia}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {zdjecia.map((zdjecie) => (
                                    <Image
                                        key={zdjecie.id}
                                        src={zdjecie.plik}
                                        alt={zdjecie.opis}
                                        width={800}
                                        height={600}
                                        className="w-full h-56 object-cover rounded-xl"
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {pytania.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{teksty.pytania}</h2>
                            <div className="space-y-4">
                                {pytania.map((element) => (
                                    <div key={element.id}>
                                        <h3 className="font-bold text-gray-900">{element.pytanie}</h3>
                                        <p>{element.odpowiedz}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                        href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-center transition-all"
                    >
                        📞 {firma.telefon}
                    </a>
                    <Link
                        href="/#formularz"
                        className="flex-1 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-lg shadow-sm text-center transition-all"
                    >
                        {teksty.wycena}
                    </Link>
                </div>
            </div>
        </div>
    );
}
