"use client";

import Image from 'next/image';
import { useState } from 'react';
import { film } from '../data/content';

// Identyfikator filmu z linku YouTube (watch?v=, youtu.be/, /shorts/, /embed/, /live/)
const idFilmu = film.youtube.match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|embed|live)\/)([\w-]{11})/)?.[1];

// Do kliknięcia strona nie łączy się z YouTube ani Google (także miniaturą), patrz polityka prywatności
export default function Film() {
    const [odtwarzaj, setOdtwarzaj] = useState(false);

    if (!idFilmu) return null;

    return (
        <section id="film" className="py-16 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{film.naglowek}</h2>
                <p className="text-center text-gray-600 mb-8">{film.opis}</p>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-md">
                    {odtwarzaj ? (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${idFilmu}?autoplay=1&rel=0`}
                            title={film.naglowek}
                            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="absolute inset-0 w-full h-full"
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setOdtwarzaj(true)}
                            className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
                        >
                            {film.podglad && (
                                <Image src={film.podglad} alt="" fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
                            )}
                            <span className="relative bg-blue-600 group-hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors">
                                ▶ {film.przycisk}
                            </span>
                        </button>
                    )}
                </div>
                <p className="mt-3 text-center text-sm text-gray-600">{film.informacja}</p>
            </div>
        </section>
    );
}
