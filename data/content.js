// =====================================================================
// data/content.js – JEDNO miejsce z treścią strony Eco-Power.
// Zmieniasz tekst w cudzysłowach. Nie usuwaj przecinków, nawiasów ani nazw
// przed dwukropkiem (np. "nazwa:"), bo strona przestanie działać.
// Pola z "TODO" to dane przykładowe – trzeba je podmienić na prawdziwe.
// =====================================================================

export const firma = {
    nazwa: "Eco-Power",
    telefon: "+48 609 447 056",
    email: "arti19-89@o2.pl",
    miasto: "ul. Targowa 29 lok. 25, 99-210 Uniejów", // UWAGA: to pełny adres (nazwa pola historyczna)
    miejscowosc: "Uniejów",                           // do SEO i nagłówków
    zasiegKm: 70,                                     // promień dojazdu; zgodny z FAQ
    nip: "8281383349",
    facebook: "https://www.facebook.com/profile.php?id=100048712626636",
    instagram: "https://www.instagram.com/ecopower2023/"
};

export const hero = {
    naglowek: "Mycie elewacji, kostki brukowej i paneli fotowoltaicznych",
    podtytul: "Przywracamy blask Twojej posesji. Działamy szybko, czysto i skutecznie na terenie Uniejowa i okolic.",
    przyciskGlosny: "Zadzwoń teraz",
    przyciskCichy: "Zobacz usługi"
};

export const uslugi = [
    {
        id: "kostka",
        nazwa: "Mycie kostki brukowej",
        opis: "Usuwamy mech, glony i ciężkie zabrudzenia z chodników, podjazdów i placów.",
        cena: "od 10 zł/m²",
        ikona: "🧹",
    },
    {
        id: "elewacja",
        nazwa: "Czyszczenie elewacji",
        opis: "Mycie ciśnieniowe i chemiczne elewacji budynków jedno i wielorodzinnych.",
        cena: "od 13 zł/m²",
        ikona: "🏠",
    },
    {
        id: "panele",
        nazwa: "Mycie paneli fotowoltaicznych",
        opis: "Bezpieczne mycie wodą demineralizowaną, co pozwala przywrócić maksymalną wydajność instalacji bez ryzyka smug i zarysowań.",
        cena: "od 12 zł/m²",
        ikona: "💧",
    },
    {
        id: "wspolnoty",
        nazwa: "Sprzątanie wspólnot mieszkaniowych",
        opis: "Regularne sprzątanie i utrzymanie czystości terenów wspólnot oraz części wspólnych.",
        cena: "wycena indywidualna",
        ikona: "🏢",
    }
];

// TODO: dane przykładowe (zdjęcia z picsum, ceny i nazwy produktów) – podmienić lub usunąć sekcję
export const produkty = [
    {
        id: "p1",
        nazwa: "Środek do mycia kostki XYZ Pro",
        opis: "Profesjonalny preparat usuwający głębokie zabrudzenia, mech i glony. Bezpieczny dla wszystkich rodzajów betonu. Pojemność: 5L.",
        cena: "89 zł",
        dostepnosc: true,
        // Zdjęcie: link zewnętrzny albo plik z folderu public, np. "/zdjecia/produkt-1.jpg"
        zdjecie: "https://picsum.photos/seed/chemia1/400/400"
    },
    {
        id: "p2",
        nazwa: "Impregnator do kostki ABC",
        opis: "Zaawansowana ochrona przed wchłanianiem wody i brudu. Zapewnia ochronę na minimum 3 lata. Pojemność: 10L.",
        cena: "149 zł",
        dostepnosc: true,
        zdjecie: "https://picsum.photos/seed/chemia2/400/400"
    },
    {
        id: "p3",
        nazwa: "Pianka aktywna do elewacji",
        opis: "Wydajny środek do mycia ciśnieniowego fasad budynków. Skutecznie usuwa sadzę i kurz. Pojemność: 5L.",
        cena: "110 zł",
        dostepnosc: false, // false = produkt chwilowo niedostępny
        zdjecie: "https://picsum.photos/seed/chemia3/400/400"
    }
];

export const dlaczegoMy = [
    {
        id: "szybko",
        tytul: "Szybki czas realizacji",
        opis: "Szanujemy Twój czas. Działamy sprawnie i terminowo, bez zbędnych opóźnień.",
        ikona: "⚡",
    },
    {
        id: "sprzet",
        tytul: "Własny sprzęt",
        opis: "Korzystamy z profesjonalnych myjek ciśnieniowych i sprawdzonych środków czyszczących.",
        ikona: "🛠️",
    },
    {
        id: "gwarancja",
        tytul: "Gwarancja jakości",
        opis: "Jesteśmy pewni naszych usług. Pozostawiamy po sobie absolutną czystość.",
        ikona: "🛡️",
    },
    {
        id: "doswiadczenie",
        tytul: "Doświadczenie",
        opis: "Umyte tysiące metrów kwadratowych paneli fotowoltaicznych i elewacji. Wiemy, co robimy.",
        ikona: "🎓",
    },
];

// TODO: zdjęcia przykładowe z picsum – podmienić na prawdziwe realizacje.
// Własne zdjęcia wrzuć do public/zdjecia/ i wpisz ścieżkę, np. "/zdjecia/podjazd-przed.jpg"
export const galeria = [
    {
        id: "g1",
        tytul: "Mycie zabrudzonej kostki brukowej",
        zdjeciePrzed: "https://picsum.photos/seed/brudny1/800/600",
        zdjeciePo: "https://picsum.photos/seed/czysty1/800/600"
    },
    {
        id: "g2",
        tytul: "Czyszczenie jasnej elewacji",
        zdjeciePrzed: "https://picsum.photos/seed/brudny2/800/600",
        zdjeciePo: "https://picsum.photos/seed/czysty2/800/600"
    },
    {
        id: "g3",
        tytul: "Usuwanie mchu z tarasu",
        zdjeciePrzed: "https://picsum.photos/seed/brudny3/800/600",
        zdjeciePo: "https://picsum.photos/seed/czysty3/800/600"
    }
];

export const faq = [
    {
        id: "f1",
        pytanie: "Czy wyjeżdżacie poza miasto?",
        odpowiedz: "Tak, obsługujemy Uniejów oraz teren w promieniu do 70 km od miasta.",
    },
    {
        id: "f2",
        pytanie: "Czy muszę przygotować dostęp do prądu i wody?",
        odpowiedz: "Wymagamy jedynie dostępu do ujęcia wody (kranu zewnętrznego). Posiadamy długie węże, więc odległość zazwyczaj nie jest problemem. O prąd zapytamy w zależności od używanego sprzętu.",
    },
    {
        id: "f3",
        pytanie: "Czy wycena usługi kosztuje?",
        odpowiedz: "Nie, wycena usługi jest w pełni bezpłatna.",
    }
];

// TODO: to są NIEPRAWDZIWE nazwy przykładowe. Przed publikacją wpisać realnych
// klientów (za ich zgodą) albo usunąć sekcję – fałszywe referencje to ryzyko prawne i wizerunkowe.
export const zaufaliNam = [
    { id: "z1", nazwa: "Wspólnota Mieszkaniowa 'Słoneczna'" },
    { id: "z2", nazwa: "Firma Budowlana Kowalbud" },
    { id: "z3", nazwa: "Urząd Gminy w XYZ" },
    { id: "z4", nazwa: "Osiedle Zielone Tarasy" },
    { id: "z5", nazwa: "Zarząd Dróg i Zieleni" }
];

// NOWE (jeszcze nieużywane przez komponenty – sekcja pojawi się w kolejnym kroku).
// Dodawaj tylko PRAWDZIWE opinie, najlepiej za zgodą klienta. Wzór:
// { id: "o1", imie: "Anna K.", miejscowosc: "Uniejów", tresc: "Kostka jak nowa, polecam!", ocena: 5 },
export const opinie = [];

// NOWE: stawki do kalkulatora orientacyjnej ceny (zgodne z cennikiem w `uslugi`).
// Klucz = id usługi, wartość = zł za m². Zmiana tutaj nie zmienia wyświetlanej ceny w `uslugi`.
export const stawki = {
    kostka: 10,
    elewacja: 13,
    panele: 12
};