"use client";

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { wyslijWycene } from '../app/actions/wycena';
import { firma, formularz } from '../data/content';

export default function FormularzWyceny() {
    const [state, formAction, isPending] = useActionState(wyslijWycene, { success: false, error: null });
    // Metraż jest sterowany przez stan, bo może go wpisać kalkulator (zdarzenie „kalkulator:metraz")
    const [metraz, setMetraz] = useState('');
    const wartosci = state.wartosci || {};

    useEffect(() => {
        const odbierz = (e) => setMetraz(e.detail);
        window.addEventListener('kalkulator:metraz', odbierz);
        return () => window.removeEventListener('kalkulator:metraz', odbierz);
    }, []);

    return (
        <section id="formularz" className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">{formularz.naglowek}</h2>
                    <p className="text-gray-600 mt-2">{formularz.opis}</p>
                </div>

                {state.success ? (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center text-green-800">
                        <span className="text-3xl block mb-2">✅</span>
                        <h3 className="font-bold text-lg">{formularz.sukcesNaglowek}</h3>
                        <p>{formularz.sukcesOpis}</p>
                        <p className="mt-5 font-semibold">{formularz.sukcesPilne}</p>
                        <a
                            href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                            className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors"
                        >
                            📞 {firma.telefon}
                        </a>
                    </div>
                ) : (
                    <form action={formAction} className="space-y-4">
                        {state.error && (
                            <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                                {state.error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="wycena-imie" className="block text-sm font-semibold text-gray-700 mb-1">{formularz.poleImie}</label>
                                <input
                                    type="text"
                                    id="wycena-imie"
                                    name="imie"
                                    defaultValue={wartosci.imie}
                                    autoComplete="name"
                                    placeholder={formularz.przykladImie}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="wycena-telefon" className="block text-sm font-semibold text-gray-700 mb-1">{formularz.poleTelefon}</label>
                                <input
                                    required
                                    type="tel"
                                    id="wycena-telefon"
                                    name="telefon"
                                    inputMode="tel"
                                    defaultValue={wartosci.telefon}
                                    autoComplete="tel"
                                    placeholder={formularz.przykladTelefon}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="wycena-miejscowosc" className="block text-sm font-semibold text-gray-700 mb-1">{formularz.poleMiejscowosc} (do {firma.zasiegKm} km)</label>
                                <input
                                    type="text"
                                    id="wycena-miejscowosc"
                                    name="miejscowosc"
                                    defaultValue={wartosci.miejscowosc}
                                    placeholder={formularz.przykladMiejscowosc}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="wycena-metraz" className="block text-sm font-semibold text-gray-700 mb-1">{formularz.poleMetraz}</label>
                                <input
                                    type="text"
                                    id="wycena-metraz"
                                    name="metraz"
                                    value={metraz}
                                    onChange={(e) => setMetraz(e.target.value)}
                                    placeholder={formularz.przykladMetraz}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="wycena-opis" className="block text-sm font-semibold text-gray-700 mb-1">{formularz.poleOpis}</label>
                            <textarea
                                id="wycena-opis"
                                name="opis"
                                defaultValue={wartosci.opis}
                                rows="3"
                                placeholder={formularz.przykladOpis}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            ></textarea>
                        </div>

                        {/* Pułapka na boty – ukryta przed ludźmi i czytnikami ekranu */}
                        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                            <label>
                                Nie wypełniaj tego pola
                                <input type="text" name="strona_www" tabIndex={-1} autoComplete="off" />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl shadow-md transition-colors"
                        >
                            {isPending ? formularz.przyciskWysylanie : formularz.przycisk}
                        </button>

                        {/* Klauzula informacyjna RODO */}
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {formularz.klauzulaRodo}{' '}
                            <Link href="/polityka-prywatnosci" className="text-blue-700 underline">
                                {formularz.linkPolityka}
                            </Link>.
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
}