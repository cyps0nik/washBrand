"use client";

import Link from 'next/link';
import { useState } from 'react';
import { firma } from '../data/content';

export default function Navbar() {
    // Stan przechowujący informację, czy menu mobilne jest otwarte
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Funkcja zamykająca menu po kliknięciu w link (na telefonie)
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" onClick={closeMenu} className="font-bold text-xl text-blue-700">
                            {firma.nazwa}
                        </Link>
                    </div>

                    {/* Menu na duże ekrany (komputery) */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/#uslugi" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">Usługi</Link>
                        <Link href="/produkty" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">Produkty</Link>
                        <Link href="/wspolpraca" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">Współpraca</Link>
                        <Link href="/#kontakt" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors">Kontakt</Link>
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
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-bold text-sm shadow-sm transition-colors"
                        >
                            Zadzwoń
                        </a>
                        {/* Przycisk "Hamburger" do otwierania menu */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-1"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="/#uslugi" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50">
                            Usługi
                        </Link>
                        <Link href="/produkty" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50">
                            Produkty
                        </Link>
                        <Link href="/wspolpraca" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50">
                            Współpraca
                        </Link>
                        <Link href="/#kontakt" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50">
                            Kontakt
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}