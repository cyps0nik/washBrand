"use client";

import { useActionState } from 'react';
import { wyslijWycene } from '../app/actions/wycena';

export default function FormularzWyceny() {
    const [state, formAction, isPending] = useActionState(wyslijWycene, { success: false, error: null });

    return (
        <section id="formularz" className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Zamów bezpłatną wycenę</h2>
                    <p className="text-gray-600 mt-2">Zostaw numer — oddzwonimy w ciągu 15 minut z konkretną ofertą.</p>
                </div>

                {state.success ? (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center text-green-800">
                        <span className="text-3xl block mb-2">✅</span>
                        <h3 className="font-bold text-lg">Dziękujemy za kontakt!</h3>
                        <p>Otrzymaliśmy Twoje zapytanie. Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                    </div>
                ) : (
                    <form action={formAction} className="space-y-4">
                        {state.error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                                {state.error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Imię / Nazwisko *</label>
                                <input
                                    required
                                    type="text"
                                    name="imie"
                                    placeholder="np. Jan Kowalski"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Numer telefonu *</label>
                                <input
                                    required
                                    type="tel"
                                    name="telefon"
                                    placeholder="np. 609 000 000"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Miejscowość (do 70 km)</label>
                                <input
                                    type="text"
                                    name="miejscowosc"
                                    placeholder="np. Uniejów, Turek, Koło"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Orientacyjny metraż</label>
                                <input
                                    type="text"
                                    name="metraz"
                                    placeholder="np. 150m² kostki"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Dodatkowe uwagi (opcjonalnie)</label>
                            <textarea
                                name="opis"
                                rows="3"
                                placeholder="Głębokie zabrudzenia olejowe, stary mech, dostęp do kranu na zewnątrz..."
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl shadow-md transition-colors"
                        >
                            {isPending ? "Wysyłanie zgłoszenia..." : "Wyślij zapytanie o bezpłatną wycenę"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}