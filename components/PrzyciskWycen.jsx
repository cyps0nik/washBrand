"use client";

// Przycisk „Wyceń" na karcie usługi: przewija do kalkulatora i ustawia fokus na tej usłudze.
// KalkulatorWyceny nasłuchuje zdarzenia „kalkulator:wybierz". Bez JavaScriptu działa jak zwykły link.
export default function PrzyciskWycen({ id, children, className }) {
    const wybierz = (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('kalkulator:wybierz', { detail: id }));
    };

    return (
        <a href="#kalkulator" onClick={wybierz} className={className}>
            {children}
        </a>
    );
}
