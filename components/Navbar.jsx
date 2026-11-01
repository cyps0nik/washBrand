"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { firma, menu, widocznosc } from '../data/content';

// Pozycje podstron wyłączonych w `widocznosc` nie pokazują się w menu
const pozycjeMenu = menu.filter((pozycja) => !pozycja.tylkoGdy || widocznosc[pozycja.tylkoGdy]);

export default function Navbar() {
    // Stan przechowujący informację, czy menu mobilne jest otwarte
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Funkcja zamykająca menu po kliknięciu w link (na telefonie)
    const closeMenu = () => setIsMenuOpen(false);
    const navRef = useRef(null);

    // Otwarte menu zamyka klawisz Esc oraz kliknięcie poza paskiem nawigacji
    useEffect(() => {
        if (!isMenuOpen) return;
        const naKlawisz = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        const naKlikniecie = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) setIsMenuOpen(false);
        };
        document.addEventListener('keydown', naKlawisz);
        document.addEventListener('pointerdown', naKlikniecie);
        return () => {
            document.removeEventListener('keydown', naKlawisz);
            document.removeEventListener('pointerdown', naKlikniecie);
        };
    }, [isMenuOpen]);

    return (
        <nav ref={navRef} className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" onClick={closeMenu} className="inline-flex items-center min-h-11 font-bold text-xl text-blue-700">
                            {firma.nazwa}
                        </Link>
                    </div>

                    {/* Menu na duże ekrany (komputery) */}
                    <div className="hidden md:flex gap-2 lg:gap-6 items-center">
                        {pozycjeMenu.map((pozycja) => (
                            <Link key={pozycja.id} href={pozycja.link} className="text-gray-700 hover:text-blue-600 px-2 py-2 font-medium transition-colors">
                                {pozycja.nazwa}
                            </Link>
                        ))}
                        <a
                            href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold transition-colors shadow-sm"
                        >
                            Zadzwoń
                        </a>
                    </div>

                    {/* Przyciski na małe ekrany (telefony) */}
                    <div className="flex items-center gap-3 md:hidden">
                        <a
                            href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                            className="inline-flex items-center min-h-11 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-md font-bold text-sm shadow-sm transition-colors"
                        >
                            Zadzwoń
                        </a>
                        {/* Przycisk "Hamburger" do otwierania menu */}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
                            aria-expanded={isMenuOpen}
                            aria-controls="menu-mobilne"
                            className="text-gray-600 hover:text-gray-900 p-2 rounded-md"
                        >
                            <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Rozwijane menu mobilne */}
            {isMenuOpen && (
                <div id="menu-mobilne" className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {pozycjeMenu.map((pozycja) => (
                            <Link key={pozycja.id} href={pozycja.link} onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50">
                                {pozycja.nazwa}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}