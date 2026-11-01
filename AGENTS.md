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
- Hosting: **Cloudflare Workers (darmowy plan)**, eksport statyczny Next.js (`output: 'export'`, folder `out/`)
  plus mały Worker na formularz (`worker/index.js`, `wrangler.jsonc`). Deploy po `git push` na `main` (Workers Builds).
  **Nie używamy Vercela** (darmowy plan tylko niekomercyjnie). Bez SSR, Server Actions i optymalizacji zdjęć.
- Zanim użyjesz API Next.js (metadata, `next/image`, sitemap, route handlers), przeczytaj odpowiedni
  przewodnik w `node_modules/next/dist/docs/` (patrz blok powyżej).

## Komendy

```bash
npm install
npm run dev      # http://localhost:3000 (bez Workera: formularz pokaże błąd z prośbą o telefon)
npm run preview  # build + lokalny Cloudflare, http://localhost:8787 (formularz; klucz w .dev.vars)
npm run lint
npm run build    # uruchom przed uznaniem zmiany za gotową
```

## Mapa repozytorium

| Ścieżka | Rola |
|---|---|
| `data/content.js` | **Cała treść**: firma, dostepnosc, widocznosc, menu, seo, kontakt, strona404, stopka, pasekMobilny, hero, uslugi, uslugiSekcja, uslugiPrzyciski, produkty, dlaczegoMy, galeria, faq, zaufaliNam, film, opinie, opinieSekcja, stawki, kalkulator, formularz, politykaPrywatnosci |
| `app/layout.jsx` | Layout (Navbar + Footer + PasekMobilny), `metadata` (metadataBase, szablon tytułu, opis, Open Graph, ikony, manifest – z `seo` i `firma`) |
| `app/sitemap.js`, `app/robots.js` | Mapa strony (bez wyłączonych podstron) i robots.txt |
| `app/not-found.jsx` | Polska strona 404 (`strona404`); w eksporcie to `out/404.html` |
| `lib/adresStrony.js` | Adres strony: `firma.adresStrony` → `http://localhost:3000` |
| `lib/limityFormularza.js` | Limity długości pól, wspólne dla formularza i Workera |
| `app/page.jsx` | Strona główna: Hero, Uslugi, KalkulatorWyceny, FormularzWyceny, DlaczegoMy, Film, Galeria, Opinie, FAQ, Kontakt; JSON-LD firmy (`HomeAndConstructionBusiness`, podtyp `LocalBusiness`) |
| `worker/index.js` | Worker: `POST /api/wycena` (walidacja, pułapki, mail przez API Resend zwykłym `fetch`; zmienne `RESEND_API_KEY`, opcjonalnie `RESEND_FROM`, `RESEND_TO`). Do logów nie trafiają dane klienta |
| `wrangler.jsonc`, `.node-version` | Konfiguracja Cloudflare (pliki z `out/`, przez Workera tylko `/api/*`) i wersja Node do builda |
| `app/produkty/page.produkty.jsx` | Podstrona `/produkty` (dane: `produkty`) – **wyłączona** w `widocznosc`: nie powstaje w buildzie, 404 |
| `app/wspolpraca/page.wspolpraca.jsx` | Podstrona `/wspolpraca` (dane: `zaufaliNam`) – **wyłączona** w `widocznosc`: nie powstaje w buildzie, 404 |
| `app/polityka-prywatnosci/page.jsx` | Podstrona `/polityka-prywatnosci` (dane: `politykaPrywatnosci` + administrator z `firma`); link w stopce i pod formularzem |
| `components/` | PrzyciskWycen (client, „Wyceń" na kartach usług), Navbar (client, sticky, pozycje z `menu`, przycisk „Zadzwoń" także na mobile), PasekMobilny (przyklejony do dołu, tylko telefony), Opinie (ukryta, gdy `opinie` puste), Hero, Uslugi, KalkulatorWyceny (client, suwaki na `stawki`), DlaczegoMy, Film (client, YouTube po kliknięciu), Galeria (widoczna tylko przy `widocznosc.galeria`), FAQ, FormularzWyceny (client), Kontakt, Footer |
| `public/` | Ikony/favicony i `site.webmanifest`; własne zdjęcia wrzucaj do `public/zdjecia/` |

Kotwice na stronie głównej: `#uslugi`, `#kalkulator`, `#formularz`, `#film`, `#galeria`, `#opinie`, `#faq`, `#kontakt`.
`<html>` ma `scroll-pt-20`, żeby sticky Navbar nie zasłaniał nagłówków po skoku do kotwicy.

Kalkulator przekazuje metraż do formularza zdarzeniem `window` o nazwie `kalkulator:metraz`
(`detail` = gotowy tekst). Przycisk „Wyceń" na karcie usługi (`components/PrzyciskWycen.jsx`)
wysyła `kalkulator:wybierz` z `id` usługi; kalkulator przewija do wiersza `wiersz-<id>` i daje fokus
polu `pole-<id>`.

Formularz: wysyła JSON na `/api/wycena` i wymaga JavaScriptu. Wymagany tylko telefon (9–15 cyfr),
ukryte pole-pułapka `strona_www` na boty, pułapka czasowa (min. 3 s, człowiek dostaje prośbę o ponowne
wysłanie), po błędzie wpisane dane wracają z `wartosci`, a wynik dostaje fokus. Kolory pól formularzy
są wymuszone w `@layer base` w `globals.css`.

Włączniki: `widocznosc` w `content.js` steruje galerią, `/produkty` i `/wspolpraca`. Podstrony mają
własne rozszerzenia plików, a `pageExtensions` w `next.config.mjs` buduje je tylko po włączeniu.
Nie zastępuj tego `notFound()`: w eksporcie powstałby plik z kodem 200 zamiast prawdziwego 404.

Kalkulator: panele liczone za sztukę; jednostkę i opis pola ma każdy suwak w `kalkulator.suwaki`.

Film: `film.youtube` puste = brak sekcji. Do kliknięcia nie ma żadnych żądań do YouTube ani Google,
dlatego podgląd to własny plik (`film.podglad`), a nie miniatura z YouTube.

Końce linii: `.gitattributes` wymusza LF w repozytorium. Nie zmieniaj tego w edytorze.

## Kluczowe zasady

1. **Treść tylko w `data/content.js`.** Nie wpisuj nowych tekstów, cen, telefonów ani linków na sztywno
   w komponentach. Stare wyjątki: teksty `/produkty` i `/wspolpraca` oraz drobne napisy w Navbar, Galeria,
   DlaczegoMy, Footer i polityce prywatności (przy okazji zmian przenoś je do `content.js`).
2. **Nie zmieniaj nazw eksportów ani pól** w `content.js` bez aktualizacji komponentów
   (`grep -r "nazwaPola" app components`). `firma.miasto` zawiera **pełny adres**;
   do nazwy miejscowości służy `firma.miejscowosc`.
3. **`content.js` ma być przyjazny laikowi:** same dane, bez logiki i importów, komentarze po polsku,
   unikalne `id` w tablicach. Dane przykładowe oznaczaj `// TODO`.
4. **Mobile-first.** Numer telefonu zawsze jako `tel:${firma.telefon.replace(/\s/g, '')}`
   (tak jest w istniejących komponentach; trzymaj ten wzorzec).
5. **Zdjęcia:** `next/image` z `images.unoptimized`, więc nic ich nie zmniejsza przy wyświetlaniu.
   Do `public/zdjecia/` wrzucaj pliki już zmniejszone (np. do 1200 px). Zawsze sensowny `alt` po polsku.
6. **Interfejs po polsku**, z poprawnymi znakami diakrytycznymi.
7. **Żadnych sekretów w repo.** Klucze API (np. do maili) tylko w zmiennych środowiskowych
   (lokalnie `.dev.vars` w `.gitignore`; w Cloudflare: Worker → Settings → Variables and Secrets,
   `RESEND_API_KEY` jako Secret, zmienne działają od razu, bez nowego builda).
8. **Nie wymyślaj faktów o firmie** (referencje, liczby realizacji, ceny, certyfikaty, godziny).
   Braki zostaw jako `TODO` i zapytaj właściciela.
9. **Uważaj na wklejane „fragmenty" w JSX.** Komentarze typu `// ...` wewnątrz JSX wyświetlają się
   na stronie jako tekst. W JSX używaj `{/* ... */}`.
10. Małe kroki: jeden krok, `lint` + `build`, potem następny.

## Znane problemy (stan na listopad 2026)

- **Pytania otwarte do właściciela:** czy ceny są brutto, czy zgłoszenia mają iść na `firma.email`
  (`arti19-89@o2.pl`), wybór domeny.
- `zaufaliNam`, `produkty` i `galeria` to **dane przykładowe** (wymyślone nazwy klientów, zdjęcia z picsum,
  ceny). Zostają tylko w kodzie: `widocznosc` je wyłącza i nie trafiają do `out/`. Nikt nie zgodził się
  na podanie nazwy firmy jako referencji. Właściciel nie ma jeszcze zdjęć ani produktów.
- Brak domeny: `firma.adresStrony` jest puste (`TODO`), więc canonical/OG/sitemap wskazują `localhost`.
  Po pierwszym wdrożeniu wpisz adres `*.workers.dev`, po zakupie domeny – domenę. Preferowana nazwa
  bez myślnika (`ecopower...`); budżet: najwyżej 50 zł/mies. na wszystko.
- Bez Profilu Firmy w Google (decyzja właściciela): widoczność opiera się na samej stronie i Search Console.
- Obrazek Open Graph to tymczasowo ikona 512×512 (`seo.obrazek`, `TODO`: zdjęcie 1200×630).
- `README.md` to opis projektu po angielsku (portfolio); osobnej instrukcji dla właściciela nie robimy.
  Brakuje w nim linku do działającej strony i zrzutów ekranu (`docs/desktop.png`, `docs/mobile.png`).
- JSON-LD (w `app/page.jsx`) bierze wszystko z `content.js` (adres, `obszar`, usługi, social media).
- Kalkulator celowo pokazuje „ok." (decyzja właściciela), a `podpisSumy` bez słowa „brutto" do czasu potwierdzenia.
- Formularz bez `RESEND_API_KEY` nie udaje sukcesu: pokazuje prośbę o telefon z numerem z `content.js`.
- **Nadawca testowy:** bez `RESEND_FROM` mail idzie z `onboarding@resend.dev`, a ten dostarcza tylko na adres
  konta Resend. Dopóki nie ma domeny, a adres konta różni się od `firma.email`, ustaw `RESEND_TO` na adres
  konta Resend. **Po zakupie domeny:** zweryfikuj ją w Resend (rekordy DNS dodane w Cloudflare), ustaw
  `RESEND_FROM`, np. `Eco-Power <wycena@domena.pl>`, i usuń `RESEND_TO`.
- Limit zgłoszeń z jednego adresu IP nie istnieje; są tylko pułapki na boty (honeypot i czas).
- Limity Cloudflare Free: Worker 100 tys. żądań dziennie i 10 ms CPU (błąd 1102), statyczne pliki bez limitu.
- Polityka prywatności to wzór, nie porada prawna. Do sprawdzenia DPA Cloudflare i Resend (`TODO`). Przy
  dodaniu analityki lub cookies trzeba ją zaktualizować (dziś strona ich nie używa; film z YouTube opisany).
- Sekcja opinii jest gotowa, ale niewidoczna, dopóki `opinie` jest puste (brak prawdziwych opinii).
- Lighthouse lokalnie (mobile, 3 przebiegi, listopad 2026): `/` wynik 77–84, dostępność 100, BP 100, SEO 100.
  Porównuj wyniki tylko z tego samego dnia i maszyny. Wydajność na hostingu sprawdź po wdrożeniu.

## Plan prac

- [x] Sticky przycisk „Zadzwoń" (jest w Navbarze, także na mobile)
- [x] Galeria przed/po (obok siebie), FAQ, Kontakt, „Dlaczego my"
- [ ] Naprawa wszystkich `TODO` w danych (prawdziwe zdjęcia, klienci, produkty)
- [~] Formularz wyceny (Resend, Worker) – działa, z klauzulą RODO; brakuje klucza w Cloudflare i własnej domeny nadawcy
- [x] Kalkulator orientacyjnej ceny (na `stawki`, suwaki)
- [x] Sekcja opinii (`opinie`; pokaże się po dodaniu prawdziwych opinii)
- [x] Pasek „Zadzwoń / Bezpłatna wycena" na dole ekranu telefonu, menu z kalkulatorem i wyceną, formularz zaraz po kalkulatorze
- [x] UX etap 1: metraż z kalkulatora do formularza, wymagany tylko telefon, „Pilne? Zadzwoń" po wysłaniu,
      pole liczbowe przy suwakach (+ „powyżej max – wycena indywidualna"), honeypot, atuty pod hero, Inter + sprzątnięty `globals.css`
- [x] UX etap 2: „Wyceń" na kartach usług (wybiera usługę w kalkulatorze), kontrast WhatsApp (`emerald-700`),
      klikalny telefon/e-mail w stopce, `aria-label`/`aria-expanded` + Esc/klik obok w menu, focus-visible
      i `prefers-reduced-motion` w `globals.css`, FAQ z `id="faq"` i JSON-LD `FAQPage`
- [x] SEO lokalne: `metadata` + Open Graph, JSON-LD (areaServed, sameAs, usługi), `sitemap`, `robots`
- [x] Ukrycie `/produkty` i `/wspolpraca` (włącznik `widocznosc`, prawdziwe 404), siatka usług 2×2 / 4, manifest, teksty Footer/Kontakt w `content.js`
- [x] Migracja na Cloudflare (eksport statyczny + Worker), walidacja i pułapki w Workerze, dostępność, polska 404, `next/image`
- [x] Film z YouTube po kliknięciu (`film`), panele za sztukę w kalkulatorze, lokalne SEO w tytule i nagłówkach
- [ ] Pierwsze wdrożenie, wpisanie adresu w `firma.adresStrony`, test formularza i sprawdzenie błędów 1102
- [ ] Opcjonalnie: suwak przed/po zamiast układu obok siebie
- [x] Polityka prywatności i klauzula RODO pod formularzem (do uzupełnienia `TODO`)
- [ ] Domena, weryfikacja domeny w Resend i `RESEND_FROM`
- [ ] Po zakupie domeny: instrukcja Google Search Console dla Cypriana (to nie Profil Firmy)
- [ ] Analityka (po decyzji)

## Przed zakończeniem zadania

- `npm run lint` i `npm run build` przechodzą.
- Wygląd sprawdzony na wąskim ekranie.
- Edycja `content.js` przez laika nadal jest bezpieczna.
- Zaktualizuj „Znane problemy" i „Plan prac", jeśli coś domknąłeś.