"use client";

import { useState } from 'react';
import { stawki, firma } from '../data/content';

export default function KalkulatorWyceny() {
    const [kostka, setKostka] = useState(100);
    const [elewacja, setElewacja] = useState(0);
    const [panele, setPanele] = useState(0);

    const suma = (kostka * (stawki?.kostka || 10)) +
        (elewacja * (stawki?.elewacja || 13)) +
        (panele * (stawki?.panele || 12));

    const buildWhatsAppMsg = () => {
        const text = `Dzień dobry, interesuje mnie wycena: Kostka ${kostka}m², Elewacja ${elewacja}m², Panele ${panele}m². Szacunek z kalkulatora: ok. ${suma} zł.`;
        return `https://wa.me/${firma.telefon.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    };

    return (
        <section id="kalkulator" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Szybka estymacja</span>
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Oblicz szacunkowy koszt usługi</h2>
                    <p className="text-gray-600 mt-2">Przesuń suwaki, aby poznać orientacyjną cenę czyszczenia Twojej posesji.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <div className="space-y-6">
                        {/* Kostka */}
                        <div>
                            <div className="flex justify-between items-center mb-2 font-semibold text-gray-800">
                                <span>Kostka brukowa ({stawki?.kostka || 10} zł/m²)</span>
                                <span className="text-blue-600 font-bold">{kostka} m²</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                step="10"
                                value={kostka}
                                onChange={(e) => setKostka(Number(e.target.value))}
                                className="w-full accent-blue-600 cursor-pointer"
                            />
                        </div>

                        {/* Elewacja */}
                        <div>
                            <div className="flex justify-between items-center mb-2 font-semibold text-gray-800">
                                <span>Czyszczenie elewacji ({stawki?.elewacja || 13} zł/m²)</span>
                                <span className="text-blue-600 font-bold">{elewacja} m²</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                step="10"
                                value={elewacja}
                                onChange={(e) => setElewacja(Number(e.target.value))}
                                className="w-full accent-blue-600 cursor-pointer"
                            />
                        </div>

                        {/* Panele */}
                        <div>
                            <div className="flex justify-between items-center mb-2 font-semibold text-gray-800">
                                <span>Panele fotowoltaiczne ({stawki?.panele || 12} zł/m²)</span>
                                <span className="text-blue-600 font-bold">{panele} m²</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="300"
                                step="5"
                                value={panele}
                                onChange={(e) => setPanele(Number(e.target.value))}
                                className="w-full accent-blue-600 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Podsumowanie */}
                    <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <span className="text-sm text-gray-500 block">Szacunkowy koszt brutto:</span>
                            <span className="text-3xl font-black text-gray-900">{suma > 0 ? `ok. ${suma} zł` : '0 zł'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="#formularz"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-center shadow-md transition-colors"
                            >
                                Zarezerwuj ten metraż
                            </a>
                            <a
                                href={buildWhatsAppMsg()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-2"
                            >
                                Wyślij na WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}