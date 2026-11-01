"use client";

import { useEffect, useState } from 'react';
import { stawki, firma, kalkulator } from '../data/content';

// Pokazujemy tylko suwaki, dla których jest stawka w `stawki`
const suwaki = kalkulator.suwaki.filter((suwak) => typeof stawki[suwak.id] === 'number');

// Górna granica pola liczbowego – chroni przed przypadkowym wpisaniem absurdalnej liczby
const LIMIT_POLA = 99999;

// Pole liczbowe może być chwilowo puste (w trakcie wpisywania), wtedy liczymy jak 0
const naLiczbe = (wartosc) => Number(wartosc) || 0;

export default function KalkulatorWyceny() {
    // Wartości trzymamy jako tekst, żeby dało się swobodnie wpisywać w pole liczbowe
    const [metraze, setMetraze] = useState(() =>
        Object.fromEntries(suwaki.map((suwak) => [suwak.id, String(suwak.start ?? 0)]))
    );

    // Usługa wybrana przyciskiem „Wyceń" na karcie usługi (podświetlana przez chwilę)
    const [wybrana, setWybrana] = useState(null);

    useEffect(() => {
        // Uslugi wysyłają zdarzenie „kalkulator:wybierz" z id usługi
        const wybierz = (e) => {
            const id = e.detail;
            const pole = document.getElementById(`pole-${id}`);
            if (!pole) return;
            const bezRuchu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            document.getElementById(`wiersz-${id}`)?.scrollIntoView({ behavior: bezRuchu ? 'auto' : 'smooth', block: 'center' });
            pole.focus({ preventScroll: true });
            setWybrana(id);
        };
        window.addEventListener('kalkulator:wybierz', wybierz);
        return () => window.removeEventListener('kalkulator:wybierz', wybierz);
    }, []);

    useEffect(() => {
        if (!wybrana) return;
        const czasomierz = setTimeout(() => setWybrana(null), 2500);
        return () => clearTimeout(czasomierz);
    }, [wybrana]);

    const ustaw = (id, wartosc) => setMetraze((poprzednie) => ({ ...poprzednie, [id]: wartosc }));

    const zPola = (id, tekst) => {
        // Zostawiamy tylko cyfry; pusty tekst jest dozwolony w trakcie wpisywania
        const cyfry = tekst.replace(/\D/g, '');
        ustaw(id, cyfry === '' ? '' : String(Math.min(Number(cyfry), LIMIT_POLA)));
    };

    const suma = suwaki.reduce((razem, suwak) => razem + naLiczbe(metraze[suwak.id]) * stawki[suwak.id], 0);

    const wybrane = suwaki.filter((suwak) => naLiczbe(metraze[suwak.id]) > 0);
    const opisMetrazu = wybrane.map((suwak) => `${suwak.nazwa} ${naLiczbe(metraze[suwak.id])} ${suwak.jednostka}`).join(', ');

    const buildWhatsAppMsg = () => {
        const text = `${kalkulator.wiadomoscWhatsApp} ${opisMetrazu || '-'}, ${kalkulator.podpisWFormularzu}: ok. ${suma} zł.`;
        return `https://wa.me/${firma.telefon.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    };

    // Przekazuje metraż do formularza wyceny (FormularzWyceny nasłuchuje tego zdarzenia)
    const przekazDoFormularza = () => {
        if (!opisMetrazu) return;
        const tekst = `${opisMetrazu} (${kalkulator.podpisWFormularzu}: ok. ${suma} zł)`;
        window.dispatchEvent(new CustomEvent('kalkulator:metraz', { detail: tekst }));
    };

    return (
        <section id="kalkulator" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">{kalkulator.etykieta}</span>
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{kalkulator.naglowek}</h2>
                    <p className="text-gray-600 mt-2">{kalkulator.opis}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <div className="space-y-6">
                        {suwaki.map((suwak) => {
                            const wartosc = naLiczbe(metraze[suwak.id]);
                            return (
                                <div
                                    key={suwak.id}
                                    id={`wiersz-${suwak.id}`}
                                    className={`-m-3 p-3 rounded-xl transition-colors duration-500 ${wybrana === suwak.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''}`}
                                >
                                    <div className="flex justify-between items-center gap-4 mb-2">
                                        <label htmlFor={`suwak-${suwak.id}`} className="font-semibold text-gray-800">
                                            {suwak.nazwa} ({stawki[suwak.id]} zł/{suwak.jednostka})
                                        </label>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <input
                                                id={`pole-${suwak.id}`}
                                                type="text"
                                                inputMode="numeric"
                                                aria-label={`${suwak.nazwa} – ${suwak.opisPola}`}
                                                value={metraze[suwak.id]}
                                                onChange={(e) => zPola(suwak.id, e.target.value)}
                                                onBlur={() => ustaw(suwak.id, String(wartosc))}
                                                onFocus={(e) => e.target.select()}
                                                className="w-20 min-h-11 px-2 py-1 text-right font-bold text-gray-900 bg-white placeholder:text-gray-500 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            />
                                            <span className="text-blue-600 font-bold">{suwak.jednostka}</span>
                                        </div>
                                    </div>
                                    <input
                                        id={`suwak-${suwak.id}`}
                                        type="range"
                                        min="0"
                                        max={suwak.max}
                                        step={suwak.krok}
                                        value={Math.min(wartosc, suwak.max)}
                                        onChange={(e) => ustaw(suwak.id, e.target.value)}
                                        className="w-full h-11 accent-blue-600 cursor-pointer"
                                    />
                                    {wartosc > suwak.max && (
                                        <p className="mt-1 text-sm font-semibold text-amber-700">
                                            Powyżej {suwak.max} {suwak.jednostka} – {kalkulator.ponadMax}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Podsumowanie */}
                    <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <span className="text-sm text-gray-500 block">{kalkulator.podpisSumy}</span>
                            <span className="text-3xl font-black text-gray-900">{suma > 0 ? `ok. ${suma} zł` : '0 zł'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#formularz"
                                onClick={przekazDoFormularza}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-center shadow-md transition-colors"
                            >
                                {kalkulator.przyciskFormularz}
                            </a>
                            {kalkulator.pokazWhatsApp && (
                                <a
                                    href={buildWhatsAppMsg()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-2"
                                >
                                    {kalkulator.przyciskWhatsApp}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
