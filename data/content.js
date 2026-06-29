// === EDYTUJ TYLKO TUTAJ — reszta kodu aktualizuje się automatycznie ===

export const firma = {
    nazwa: "Mycie Bruku Kowalski",
    telefon: "+48 600 000 000",
    email: "kontakt@myciebruku.pl",
    miasto: "Warszawa i okolice",
    nip: "000-000-00-00",
};

export const hero = {
    naglowek: "Profesjonalne mycie kostki i elewacji",
    podtytul: "Przywracamy blask Twojej posesji. Działamy szybko, czysto i skutecznie na terenie Warszawy i w promieniu 50 km.",
    przyciskGlosny: "Zadzwoń teraz",
    przyciskCichy: "Zobacz usługi"
};

export const uslugi = [
    {
        id: "kostka",
        nazwa: "Mycie kostki brukowej",
        opis: "Usuwamy mech, glony i ciężkie zabrudzenia z chodników, podjazdów i placów.",
        cena: "od 15 zł/m²",
        ikona: "🧹",
    },
    {
        id: "elewacja",
        nazwa: "Czyszczenie elewacji",
        opis: "Mycie ciśnieniowe i chemiczne elewacji budynków jedno- i wielorodzinnych.",
        cena: "od 20 zł/m²",
        ikona: "🏠",
    },
    {
        id: "dach",
        nazwa: "Mycie dachów",
        opis: "Bezpieczne usuwanie zabrudzeń i mchu z dachówek ceramicznych i blachy.",
        cena: "od 25 zł/m²",
        ikona: "Roof", // Możemy tu wstawić emoji 🧱 lub ikonę
    }
];

// we fragmentach pliku data/content.js znajdź i zaktualizuj:

export const produkty = [
    {
        id: "p1",
        nazwa: "Środek do mycia kostki XYZ Pro",
        opis: "Profesjonalny preparat usuwający głębokie zabrudzenia, mech i glony. Bezpieczny dla wszystkich rodzajów betonu. Pojemność: 5L.",
        cena: "89 zł",
        dostepnosc: true,
        // Ścieżka do zdjęcia (może być link zewnętrzny lub plik w folderze public np. "/zdjecia/produkt-1.jpg")
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
        dostepnosc: false, // Przykładowo produkt chwilowo niedostępny
        zdjecie: "https://picsum.photos/seed/chemia3/400/400"
    }
];
// ... (tutaj znajdują się wcześniej dodane: firma, hero, uslugi, produkty)

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
        opis: "Umyte tysiące metrów kwadratowych kostki i elewacji. Wiemy, co robimy.",
        ikona: "🎓",
    },
];

export const galeria = [
    // Jeśli wujek będzie miał własne zdjęcia, wystarczy że wrzuci je do folderu public/zdjecia/
    // i zmieni tu ścieżkę na np. "/zdjecia/przed1.jpg"
    { id: "g1", url: "https://picsum.photos/seed/bruk1/600/400", alt: "Mycie podjazdu - po" },
    { id: "g2", url: "https://picsum.photos/seed/bruk2/600/400", alt: "Czyszczenie elewacji przed i po" },
    { id: "g3", url: "https://picsum.photos/seed/bruk3/600/400", alt: "Odświeżona kostka na tarasie" },
    { id: "g4", url: "https://picsum.photos/seed/bruk4/600/400", alt: "Mycie ogrodzenia" },
];

export const faq = [
    {
        id: "f1",
        pytanie: "Czy wyjeżdżacie poza miasto?",
        odpowiedz: "Tak, obsługujemy Warszawę oraz teren w promieniu do 50 km od miasta.",
    },
    {
        id: "f2",
        pytanie: "Czy muszę przygotować dostęp do prądu i wody?",
        odpowiedz: "Wymagamy jedynie dostępu do ujęcia wody (kranu zewnętrznego). Posiadamy długie węże, więc odległość zazwyczaj nie jest problemem. O prąd zapytamy w zależności od używanego sprzętu.",
    },
    {
        id: "f3",
        pytanie: "Czy środki chemiczne są bezpieczne dla roślin?",
        odpowiedz: "Używamy profesjonalnej, w 100% biodegradowalnej chemii, która nie zagraża trawnikom, krzewom ani zwierzętom domowym.",
    },
];
// Przyszła struktura dla wujka
// export const galeria = [
//     {
//         id: "projekt1",
//         tytul: "Mycie podjazdu z kostki",
//         zdjeciePrzed: "/zdjecia/podjazd-przed.jpg",
//         zdjeciePo: "/zdjecia/podjazd-po.jpg"
//     }
// ];