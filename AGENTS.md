<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md – Eco-Power (repo `washBrand`)

Instrukcje dla agentów AI i osób wchodzących w projekt. Blok powyżej jest generowany przez Next.js
i zostaje bez zmian. Poniżej zasady specyficzne dla tego projektu.

## Czym jest projekt

Strona-wizytówka firmy **Eco-Power** (Uniejów, zasięg do ~70 km): mycie kostki brukowej, elewacji,
paneli fotowoltaicznych, sprzątanie wspólnot. Cel strony: **telefon i zapytania o wycenę**.
Język strony: polski. Odbiorcy: klienci lokalni, głównie z telefonów.

Właściciel firmy **nie programuje** i edytuje tylko `data/content.js`.
Ten plik musi zostać prosty i odporny na pomyłki.

## Stack (zweryfikowany w `package.json`)

- **Next.js 16.4.3**, App Router (`app/`), **React 19.2**, JavaScript/JSX bez TypeScriptu.
- **Tailwind CSS v4** (`@import "tailwindcss"` w `app/globals.css`, plugin `@tailwindcss/postcss`).
- Czcionka **Inter** przez `next/font/google` (`latin` + `latin-ext`) w `app/layout.jsx`, podpięta jako `--font-sans`.
  Strona ma tylko jasny motyw (bez trybu ciemnego).
  Brak `tailwind.config.js`; ustawienia idą przez `@theme` w CSS. Nie dodawaj konfiguracji w stylu v3.
- ESLint 9 flat config (`eslint-config-next/core-web-vitals`).
- Hosting: Vercel, deploy po `git push` na `main`.
- Zanim użyjesz API Next.js (metadata, `next/image`, sitemap, route handlers), przeczytaj odpowiedni
  przewodnik w `node_modules/next/dist/docs/` (patrz blok powyżej).

## Komendy

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # uruchom przed uznaniem zmiany za gotową
```

## Mapa repozytorium

| Ścieżka | Rola |
|---|---|
| `data/content.js` | **Cała treść**: firma, menu, seo, kontakt, stopka, pasekMobilny, hero, uslugi, uslugiPrzyciski, produkty, dlaczegoMy, galeria, faq, zaufaliNam, opinie, opinieSekcja, stawki, kalkulator, formularz, politykaPrywatnosci |
| `app/layout.jsx` | Layout (Navbar + Footer + PasekMobilny), `metadata` (metadataBase, szablon tytułu, opis, Open Graph, ikony, manifest – z `seo` i `firma`) |
| `app/sitemap.js`, `app/robots.js` | Mapa strony (bez ukrytych podstron) i robots.txt |
| `lib/adresStrony.js` | Adres strony: `firma.adresStrony` → `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000` |
| `app/page.jsx` | Strona główna: Hero, Uslugi, KalkulatorWyceny, FormularzWyceny, DlaczegoMy, Galeria, Opinie, FAQ, Kontakt; JSON-LD firmy |
| `app/actions/wycena.js` | Server action formularza wyceny (mail przez Resend; zmienne `RESEND_API_KEY`, opcjonalnie `RESEND_FROM`) |
| `app/produkty/page.jsx` | Podstrona `/produkty` (dane: `produkty`) – **ukryta**: `noindex`, poza menu i sitemap |
| `app/wspolpraca/page.jsx` | Podstrona `/wspolpraca` (dane: `zaufaliNam`) – **ukryta**: `noindex`, poza menu i sitemap |
| `app/polityka-prywatnosci/page.jsx` | Podstrona `/polityka-prywatnosci` (dane: `politykaPrywatnosci` + administrator z `firma`); link w stopce i pod formularzem |
| `components/` | PrzyciskWycen (client, „Wyceń" na kartach usług), Navbar (client, sticky, pozycje z `menu`, przycisk „Zadzwoń" także na mobile), PasekMobilny (przyklejony do dołu, tylko telefony), Opinie (ukryta, gdy `opinie` puste), Hero, Uslugi, KalkulatorWyceny (client, suwaki na `stawki`), DlaczegoMy, Galeria, FAQ, FormularzWyceny (client), Kontakt, Footer |
| `public/` | Ikony/favicony i `site.webmanifest`; własne zdjęcia wrzucaj do `public/zdjecia/` |

Kotwice na stronie głównej: `#uslugi`, `#kalkulator`, `#formularz`, `#galeria`, `#opinie`, `#faq`, `#kontakt`.
`<html>` ma `scroll-pt-20`, żeby sticky Navbar nie zasłaniał nagłówków po skoku do kotwicy.

Kalkulator przekazuje metraż do formularza zdarzeniem `window` o nazwie `kalkulator:metraz`
(`detail` = gotowy tekst). Przycisk „Wyceń" na karcie usługi (`components/PrzyciskWycen.jsx`)
wysyła `kalkulator:wybierz` z `id` usługi; kalkulator przewija do wiersza `wiersz-<id>` i daje fokus
polu `pole-<id>`.

Formularz: wymagany tylko telefon (min. 9 cyfr), ukryte pole-pułapka `strona_www` na boty,
po błędzie wpisane dane wracają z akcji (`wartosci`). Kolory pól formularzy są wymuszone
w `@layer base` w `globals.css`.

Końce linii: `.gitattributes` wymusza LF w repozytorium. Nie zmieniaj tego w edytorze.

## Kluczowe zasady

1. **Treść tylko w `data/content.js`.** Nie wpisuj tekstów, cen, telefonów ani linków na sztywno
   w komponentach. Wyjątek: teksty podstron `/produkty` i `/wspolpraca` (ukryte do czasu prawdziwych danych).
2. **Nie zmieniaj nazw eksportów ani pól** w `content.js` bez aktualizacji komponentów
   (`grep -r "nazwaPola" app components`). `firma.miasto` zawiera **pełny adres**;
   do nazwy miejscowości służy `firma.miejscowosc`.
3. **`content.js` ma być przyjazny laikowi:** same dane, bez logiki i importów, komentarze po polsku,
   unikalne `id` w tablicach. Dane przykładowe oznaczaj `// TODO`.
4. **Mobile-first.** Numer telefonu zawsze jako `tel:${firma.telefon.replace(/\s/g, '')}`
   (tak jest w istniejących komponentach; trzymaj ten wzorzec).
5. **Zdjęcia:** obecnie zwykłe `<img>`. Przy zmianie na `next/image` skonfiguruj `remotePatterns`
   w `next.config.mjs` dla domen zewnętrznych, albo użyj plików z `public/zdjecia/`.
   Zawsze sensowny `alt` po polsku.
6. **Interfejs po polsku**, z poprawnymi znakami diakrytycznymi.
7. **Żadnych sekretów w repo.** Klucze API (np. do maili) tylko w zmiennych środowiskowych
   (`.env*` jest w `.gitignore`; w Vercel jako Environment Variables).
8. **Nie wymyślaj faktów o firmie** (referencje, liczby realizacji, ceny, certyfikaty, godziny).
   Braki zostaw jako `TODO` i zapytaj właściciela.
9. **Uważaj na wklejane „fragmenty" w JSX.** Komentarze typu `// ...` wewnątrz JSX wyświetlają się
   na stronie jako tekst. W JSX używaj `{/* ... */}`.
10. Małe kroki: jeden krok, `lint` + `build`, potem następny.

## Znane problemy (stan na październik 2026)

- `zaufaliNam` i `produkty` to **dane przykładowe** (wymyślone nazwy klientów, zdjęcia z picsum,
  ceny). Strony `/wspolpraca` i `/produkty` są ukryte (poza menu i sitemap, `noindex`), ale nadal
  dostępne pod bezpośrednim adresem. `kontakt.dopisek` wspomina o sprzedaży produktów – do potwierdzenia.
- Brak domeny: `firma.adresStrony` jest puste (`TODO`), więc canonical/OG/sitemap używają adresu z Vercela.
- Obrazek Open Graph to tymczasowo ikona 512×512 (`seo.obrazek`, `TODO`: zdjęcie 1200×630).
- `firma.obszar` (miejscowości w opisie i JSON-LD) do potwierdzenia z właścicielem.
- `README.md` to opis projektu po angielsku (portfolio); osobnej instrukcji dla właściciela nie robimy.
  Brakuje w nim linku do działającej strony i zrzutów ekranu (`docs/desktop.png`, `docs/mobile.png`).
- JSON-LD (w `app/page.jsx`) bierze wszystko z `content.js` (adres, `obszar`, usługi, social media).
- Do potwierdzenia z właścicielem (`TODO` w `kalkulator` i `formularz`): czas oddzwonienia
  „15 minut", czy ceny są brutto, czy firma używa WhatsAppa.
- Formularz wysyła maile przez Resend tylko przy ustawionym `RESEND_API_KEY` (bez klucza zgłoszenie
  trafia jedynie do logów serwera). Nadawca domyślny `onboarding@resend.dev` dostarcza tylko na adres
  konta Resend; po weryfikacji domeny ustaw `RESEND_FROM`.
- Polityka prywatności to wzór, nie porada prawna. Brakuje `firma.wlasciciel` (administrator danych)
  i potwierdzenia okresu przechowywania danych (`TODO` w `politykaPrywatnosci`). Przy dodaniu
  analityki lub cookies trzeba ją zaktualizować (dziś strona ich nie używa).
- Sekcja opinii jest gotowa, ale niewidoczna, dopóki `opinie` jest puste (brak prawdziwych opinii).

## Plan prac

- [x] Sticky przycisk „Zadzwoń" (jest w Navbarze, także na mobile)
- [x] Galeria przed/po (obok siebie), FAQ, Kontakt, „Dlaczego my"
- [ ] Naprawa wszystkich `TODO` w danych (prawdziwe zdjęcia, klienci, produkty)
- [~] Formularz wyceny (Resend, server action) – działa, z klauzulą RODO; brakuje klucza w Vercel i własnej domeny nadawcy
- [x] Kalkulator orientacyjnej ceny (na `stawki`, suwaki)
- [x] Sekcja opinii (`opinie`; pokaże się po dodaniu prawdziwych opinii)
- [x] Pasek „Zadzwoń / Bezpłatna wycena" na dole ekranu telefonu, menu z kalkulatorem i wyceną, formularz zaraz po kalkulatorze
- [x] UX etap 1: metraż z kalkulatora do formularza, wymagany tylko telefon, „Pilne? Zadzwoń" po wysłaniu,
      pole liczbowe przy suwakach (+ „powyżej max – wycena indywidualna"), honeypot, atuty pod hero, Inter + sprzątnięty `globals.css`
- [x] UX etap 2: „Wyceń" na kartach usług (wybiera usługę w kalkulatorze), kontrast WhatsApp (`emerald-700`),
      klikalny telefon/e-mail w stopce, `aria-label`/`aria-expanded` + Esc/klik obok w menu, focus-visible
      i `prefers-reduced-motion` w `globals.css`, FAQ z `id="faq"` i JSON-LD `FAQPage`
- [x] SEO lokalne: `metadata` + Open Graph, JSON-LD (areaServed, sameAs, usługi), `sitemap`, `robots`
- [x] Ukrycie `/produkty` i `/wspolpraca` (noindex), siatka usług 2×2 / 4, manifest, teksty Footer/Kontakt w `content.js`
- [ ] Opcjonalnie: suwak przed/po zamiast układu obok siebie, `next/image`
- [x] Polityka prywatności i klauzula RODO pod formularzem (do uzupełnienia `TODO`)
- [ ] Domena, analityka

## Przed zakończeniem zadania

- `npm run lint` i `npm run build` przechodzą.
- Wygląd sprawdzony na wąskim ekranie.
- Edycja `content.js` przez laika nadal jest bezpieczna.
- Zaktualizuj „Znane problemy" i „Plan prac", jeśli coś domknąłeś.