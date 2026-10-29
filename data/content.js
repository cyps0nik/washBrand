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
    ulica: "ul. Targowa 29 lok. 25",                  // do danych dla Google (sama ulica i numer)
    kodPocztowy: "99-210",                            // do danych dla Google
    zasiegKm: 70,                                     // promień dojazdu; zgodny z FAQ
    // Miejscowości w zasięgu – do opisu w Google i danych o obszarze działania
    obszar: ["Uniejów", "Turek", "Koło", "Poddębice", "Dąbie", "Łęczyca", "Konin", "Sieradz"], // TODO: potwierdzić z właścicielem, które miejscowości wymieniać
    adresStrony: "",                                  // TODO: adres strony, np. "https://eco-power-uniejow.pl" (pusty = adres z Vercela)
    nip: "8281383349",
    wlasciciel: "",                                   // TODO: imię i nazwisko właściciela (administrator danych w polityce prywatności)
    facebook: "https://www.facebook.com/profile.php?id=100048712626636",
    instagram: "https://www.instagram.com/ecopower2023/"
};

// Menu na górze strony. "link" z # prowadzi do sekcji na stronie głównej, bez # – do podstrony.
export const menu = [
    { id: "uslugi", nazwa: "Usługi", link: "/#uslugi" },
    { id: "kalkulator", nazwa: "Kalkulator", link: "/#kalkulator" },
    { id: "wycena", nazwa: "Wycena", link: "/#formularz" },
    // Ukryte, dopóki podstrony mają dane przykładowe. Aby przywrócić: usuń "// " z początku linii
    // i w pliku app/produkty/page.jsx lub app/wspolpraca/page.jsx usuń blok "robots".
    // { id: "produkty", nazwa: "Produkty", link: "/produkty" },
    // { id: "wspolpraca", nazwa: "Współpraca", link: "/wspolpraca" },
    { id: "kontakt", nazwa: "Kontakt", link: "/#kontakt" }
];

// Opis strony dla Google i przy udostępnianiu linku (Facebook, Messenger, WhatsApp).
// Tytuł najlepiej do ~60 znaków, opis do ~155 znaków.
export const seo = {
    tytul: "Eco-Power – mycie kostki, elewacji i paneli PV | Uniejów, Turek, Koło",
    opis: "Mycie kostki brukowej, elewacji i paneli fotowoltaicznych oraz sprzątanie wspólnot. Uniejów, Turek, Koło, Poddębice i okolice do 70 km. Bezpłatna wycena.",
    // Obrazek przy udostępnianiu linku. TODO: podmienić na zdjęcie realizacji 1200×630 px, np. "/zdjecia/udostepnianie.jpg"
    obrazek: "/android-chrome-512x512.png"
};

// Sekcja „Kontakt" na dole strony głównej
export const kontakt = {
    naglowek: "Gotowy na lśniącą kostkę, elewację i czyste panele?",
    opis: "Zadzwoń do nas lub napisz, aby umówić się na bezpłatną wycenę.",
    // Wyłączone, dopóki podstrona /produkty jest ukryta. Poprzedni tekst:
    // "Zakup naszych produktów możliwy jest również bezpośrednio przez telefon."
    dopisek: "",
    przyciskEmail: "Napisz do nas"
};

// Stopka (na każdej podstronie)
export const stopka = {
    opis: "Profesjonalne mycie kostki brukowej, elewacji i paneli fotowoltaicznych oraz sprzątanie wspólnot mieszkaniowych."
};

// Pasek z przyciskami przyklejony do dołu ekranu (widoczny tylko na telefonach).
export const pasekMobilny = {
    zadzwon: "Zadzwoń",
    wycena: "Bezpłatna wycena"
};

export const hero = {
    naglowek: "Mycie elewacji, kostki brukowej i paneli fotowoltaicznych",
    podtytul: "Przywracamy blask Twojej posesji. Działamy szybko, czysto i skutecznie na terenie Uniejowa i okolic.",
    przyciskGlosny: "Zadzwoń teraz",
    przyciskCichy: "Zobacz usługi",
    // Krótkie atuty pod przyciskami. Pisz tylko prawdę; zasięg trzymaj zgodny z firma.zasiegKm.
    atuty: ["Bezpłatna wycena", "Dojazd do 70 km", "Własny sprzęt"]
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

// Przyciski na kartach usług. „Wyceń" pokazuje się przy usługach, które mają suwak w kalkulatorze;
// pozostałe (np. wspólnoty) dostają przycisk prowadzący do formularza.
export const uslugiPrzyciski = {
    wycen: "Wyceń w kalkulatorze",
    zapytaj: "Zapytaj o wycenę"
};

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

// Opinie klientów. Sekcja pojawi się na stronie dopiero, gdy dodasz tu pierwszą opinię.
// Dodawaj tylko PRAWDZIWE opinie, najlepiej za zgodą klienta. "ocena" to liczba gwiazdek od 1 do 5. Wzór:
// { id: "o1", imie: "Anna K.", miejscowosc: "Uniejów", tresc: "Kostka jak nowa, polecam!", ocena: 5 },
export const opinie = [];

// Teksty sekcji opinii. "link" (np. do opinii w Google) jest opcjonalny – zostaw "" jeśli go nie ma.
export const opinieSekcja = {
    naglowek: "Co mówią nasi klienci",
    opis: "Opinie osób, dla których pracowaliśmy.",
    link: "",          // TODO: link do opinii w Google lub na Facebooku, jeśli firma je zbiera
    linkTekst: "Zobacz więcej opinii"
};

// NOWE: stawki do kalkulatora orientacyjnej ceny (zgodne z cennikiem w `uslugi`).
// Klucz = id usługi, wartość = zł za m². Zmiana tutaj nie zmienia wyświetlanej ceny w `uslugi`.
export const stawki = {
    kostka: 10,
    elewacja: 13,
    panele: 12
};

// Teksty kalkulatora ceny (sekcja z suwakami). Ceny za m² ustawiasz wyżej w `stawki`.
export const kalkulator = {
    etykieta: "Szybka estymacja",
    naglowek: "Oblicz szacunkowy koszt usługi",
    opis: "Przesuń suwaki, aby poznać orientacyjną cenę czyszczenia Twojej posesji.",
    podpisSumy: "Szacunkowy koszt brutto:", // TODO: potwierdzić z właścicielem, czy ceny są brutto
    przyciskFormularz: "Zarezerwuj ten metraż",
    pokazWhatsApp: true,                     // TODO: potwierdzić, czy firma używa WhatsAppa (false = przycisk znika)
    przyciskWhatsApp: "Wyślij na WhatsApp",
    wiadomoscWhatsApp: "Dzień dobry, interesuje mnie wycena:",
    // Gdy ktoś wpisze metraż większy niż "max" suwaka, pod suwakiem pojawi się np. „Powyżej 500 m² – wycena indywidualna"
    ponadMax: "wycena indywidualna",
    // Ten opis trafia do pola „Orientacyjny metraż" w formularzu po kliknięciu „Zarezerwuj ten metraż"
    podpisWFormularzu: "szacunek z kalkulatora",
    // Suwaki: "id" musi być takie samo jak nazwa w `stawki` (np. kostka). Bez stawki suwak się nie pokaże.
    // max = największy metraż, krok = o ile m² przeskakuje suwak, start = wartość na początku.
    suwaki: [
        { id: "kostka", nazwa: "Kostka brukowa", max: 500, krok: 10, start: 100 },
        { id: "elewacja", nazwa: "Czyszczenie elewacji", max: 500, krok: 10, start: 0 },
        { id: "panele", nazwa: "Panele fotowoltaiczne", max: 300, krok: 5, start: 0 }
    ]
};

// Teksty formularza „Zamów bezpłatną wycenę".
export const formularz = {
    naglowek: "Zamów bezpłatną wycenę",
    opis: "Zostaw numer — oddzwonimy w ciągu 15 minut z konkretną ofertą.", // TODO: potwierdzić z właścicielem czas oddzwonienia
    poleImie: "Imię (opcjonalnie)",
    przykladImie: "np. Jan Kowalski",
    poleTelefon: "Numer telefonu *",
    przykladTelefon: "np. 609 000 000",
    poleMiejscowosc: "Miejscowość",          // strona sama dopisze zasięg, np. „(do 70 km)"
    przykladMiejscowosc: "np. Uniejów, Turek, Koło",
    poleMetraz: "Orientacyjny metraż",
    przykladMetraz: "np. 150 m² kostki",
    poleOpis: "Dodatkowe uwagi (opcjonalnie)",
    przykladOpis: "Głębokie zabrudzenia olejowe, stary mech, dostęp do kranu na zewnątrz...",
    przycisk: "Wyślij zapytanie o bezpłatną wycenę",
    przyciskWysylanie: "Wysyłanie zgłoszenia...",
    sukcesNaglowek: "Dziękujemy za kontakt!",
    sukcesOpis: "Otrzymaliśmy Twoje zapytanie. Skontaktujemy się z Tobą najszybciej jak to możliwe.",
    sukcesPilne: "Pilne? Zadzwoń:",
    klauzulaRodo: "Administratorem Twoich danych jest Eco-Power. Podane dane wykorzystamy tylko do przygotowania wyceny i kontaktu w tej sprawie. Szczegóły i Twoje prawa:",
    linkPolityka: "polityka prywatności",
    bladBrakDanych: "Podaj numer telefonu, żebyśmy mogli oddzwonić.",
    bladTelefon: "Numer telefonu wygląda na niepełny. Sprawdź go, proszę.",
    bladWysylki: "Błąd wysyłki. Skontaktuj się bezpośrednio pod numerem telefonu."
};

// Polityka prywatności (podstrona /polityka-prywatnosci).
// Dane administratora (nazwa, właściciel, adres, NIP, e-mail, telefon) strona bierze sama z `firma`.
// Każdy akapit to osobny tekst w cudzysłowie, oddzielony przecinkiem.
// UWAGA: to wzór, a nie porada prawna. Przy zmianie sposobu działania strony (np. analityka, nowy
// dostawca maili) trzeba zaktualizować treść.
export const politykaPrywatnosci = {
    tytul: "Polityka prywatności",
    aktualizacja: "29 października 2026", // data ostatniej zmiany tej polityki
    wstep: "Poniżej wyjaśniamy, jakie dane osobowe zbieramy przez tę stronę, w jakim celu i jakie masz prawa. Stosujemy przepisy RODO (rozporządzenie UE 2016/679).",
    sekcje: [
        {
            id: "zakres",
            naglowek: "Jakie dane zbieramy",
            akapity: [
                "Przez formularz wyceny zbieramy: imię lub imię i nazwisko, numer telefonu oraz – jeśli je podasz – miejscowość, orientacyjny metraż i dodatkowe uwagi.",
                "Jeśli dzwonisz, piszesz e-mail lub wiadomość (np. przez WhatsApp), przetwarzamy dane, które sam nam przekażesz w tej rozmowie.",
                "Serwer, na którym działa strona, automatycznie zapisuje techniczne dane o wizytach (np. adres IP, rodzaj przeglądarki, czas wejścia) w celu zapewnienia bezpieczeństwa i działania strony."
            ]
        },
        {
            id: "cel",
            naglowek: "W jakim celu i na jakiej podstawie",
            akapity: [
                "Przygotowanie wyceny i kontakt w sprawie zapytania – na Twoje żądanie, przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).",
                "Realizacja zamówionej usługi i rozliczenia – wykonanie umowy oraz obowiązki prawne, np. podatkowe (art. 6 ust. 1 lit. b i c RODO).",
                "Bezpieczeństwo strony oraz ewentualne dochodzenie lub obrona roszczeń – nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).",
                "Podanie danych jest dobrowolne, ale bez numeru telefonu nie możemy odpowiedzieć na zapytanie z formularza."
            ]
        },
        {
            id: "odbiorcy",
            naglowek: "Komu przekazujemy dane",
            akapity: [
                "Nie sprzedajemy danych i nie przekazujemy ich innym firmom w celach marketingowych.",
                "Dane mogą trafić do dostawców usług, z których korzystamy przy prowadzeniu strony i kontaktu: Vercel Inc. (hosting strony), Resend (wysyłka wiadomości z formularza na naszą skrzynkę) oraz dostawca naszej poczty e-mail. Przetwarzają one dane wyłącznie na nasze zlecenie.",
                "Vercel i Resend mają siedzibę w USA, więc dane mogą być przekazywane poza Europejski Obszar Gospodarczy. Odbywa się to na podstawie mechanizmów przewidzianych w RODO, takich jak standardowe klauzule umowne zatwierdzone przez Komisję Europejską.", // TODO: sprawdzić w umowach powierzenia (DPA) Vercel i Resend
                "Jeśli piszesz do nas przez WhatsApp, Facebooka lub Instagram, dane przetwarza także operator tej usługi (Meta) na własnych zasadach."
            ]
        },
        {
            id: "okres",
            naglowek: "Jak długo przechowujemy dane",
            akapity: [
                // TODO: potwierdzić z właścicielem, jak długo przechowuje zapytania (np. 12 miesięcy)
                "Dane z zapytania przechowujemy przez czas potrzebny do przygotowania wyceny i kontaktu w tej sprawie. Jeśli zamówisz usługę – przez czas jej realizacji, a potem przez okres wymagany przepisami (np. podatkowymi) lub do przedawnienia ewentualnych roszczeń."
            ]
        },
        {
            id: "prawa",
            naglowek: "Twoje prawa",
            akapity: [
                "Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.",
                "Aby skorzystać z tych praw, napisz lub zadzwoń do nas – dane kontaktowe są powyżej.",
                "Masz też prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl)."
            ]
        },
        {
            id: "cookies",
            naglowek: "Pliki cookies i analityka",
            akapity: [
                "Strona nie używa plików cookies do śledzenia ani narzędzi analitycznych i nie wyświetla reklam.",
                "Linki do Facebooka, Instagrama i WhatsAppa prowadzą do zewnętrznych serwisów, które mają własne polityki prywatności."
            ]
        }
    ]
};
