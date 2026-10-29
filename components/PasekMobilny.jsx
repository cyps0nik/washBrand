import Link from 'next/link';
import { firma, pasekMobilny } from '../data/content';

// Pasek z przyciskami przyklejony do dołu ekranu – tylko na telefonach (md:hidden)
export default function PasekMobilny() {
    return (
        <>
            {/* Odstęp, żeby pasek nie zasłaniał dołu stopki */}
            <div className="h-16 md:hidden" aria-hidden="true" />

            <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                <div className="flex gap-2">
                    <a
                        href={`tel:${firma.telefon.replace(/\s/g, '')}`}
                        className="flex-1 bg-blue-600 active:bg-blue-700 text-white font-bold py-3 rounded-xl text-center shadow-md"
                    >
                        📞 {pasekMobilny.zadzwon}
                    </a>
                    <Link
                        href="/#formularz"
                        className="flex-1 bg-white active:bg-slate-100 text-blue-700 border border-blue-600 font-bold py-3 rounded-xl text-center"
                    >
                        {pasekMobilny.wycena}
                    </Link>
                </div>
            </div>
        </>
    );
}
