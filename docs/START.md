# Start strony Eco-Power

Strona czeka na domenę `ecopoweruniejow.pl` i zdjęcia. Nazwy w panelach Hostido, Cloudflare i Google
mogą się nieco różnić od opisanych.

## Wiadomość do wujka: zdjęcia

> Potrzebuję zdjęć na stronę:
>
> 1. **Przed i po:** kilka par, najlepiej 3–6. Każda para z tego samego miejsca i pod tym samym kątem.
> 2. **Jedno ładne zdjęcie poziome** z pracy. Będzie widoczne przy udostępnianiu linku do strony.
>
> Telefon trzymaj poziomo, rób zdjęcia w dzień. Pokazuj tylko efekt pracy: bez twarzy, tablic
> rejestracyjnych i numerów domów. Na zdjęcia cudzych posesji i budynków zapytaj właściciela o zgodę.
>
> Wyślij **oryginały jako pliki** (Google Drive, WeTransfer albo mail), nie przez Messengera ani WhatsAppa,
> bo te je psują. Przy każdej parze napisz, co to za praca, np. „mycie podjazdu, Turek”. Nie musisz niczego
> zmniejszać. Jeśli masz iPhone'a, ustaw Aparat → Formaty → Najbardziej zgodne, żeby zdjęcia były w JPG.

## Przygotowanie zdjęć

1. Utwórz w projekcie folder `zdjecia-surowe/` (nie trafia do repozytorium) i wrzuć do niego pliki.
2. Nazwij je parami, np. `podjazd-turek-przed.jpg` i `podjazd-turek-po.jpg`.
   Zdjęcie do podglądu linku nazwij `udostepnianie.jpg`.
3. Uruchom `npm run zdjecia`. Gotowe pliki trafią do `public/zdjecia/`: do 1600 px, JPG, bez danych GPS.
   Plik `udostepnianie` zostanie wykadrowany do 1200×630 px.
4. Pliki HEIC trzeba wcześniej zamienić na JPG. Skrypt je pomija i wypisuje na końcu.

## Lista na dzień startu

### 1. Zakup domeny (wujek)
- [ ] Kup `ecopoweruniejow.pl` w Hostido **na dane wujka lub firmy**. Sprawdź cenę odnowienia i włącz przypomnienie.
- [ ] Napisz „domena kupiona”. Dopiero wtedy wpisujemy ją do `firma.adresStrony`.

### 2. Domena w Cloudflare
- [ ] Cloudflare → **Add a domain** → `ecopoweruniejow.pl` → plan **Free**.
- [ ] Skopiuj dwa serwery nazw, które poda Cloudflare.
- [ ] Hostido → domena → **serwery DNS** → wpisz te dwa adresy. Wyłącz DNSSEC, jeśli jest włączony.
- [ ] Poczekaj na status **Active** i maila od Cloudflare. Zwykle kilka godzin, czasem do 48 godzin.

### 3. Email Routing
- [ ] Cloudflare → domena → **Email → Email Routing** → **Get started**.
- [ ] Dodaj adres docelowy `arti19-89@o2.pl`.
- [ ] Wujek otwiera maila od Cloudflare (sprawdź też spam w o2.pl) i klika **Verify email address**.
- [ ] Utwórz adres, np. `kontakt@ecopoweruniejow.pl` → `arti19-89@o2.pl`.
- [ ] Zatwierdź rekordy DNS, które doda Cloudflare (MX, SPF, DKIM). Status ma być **Enabled**.

### 4. Publikacja kodu i Worker
- [ ] Wpisz `firma.adresStrony: "https://ecopoweruniejow.pl"` w `data/content.js`.
- [ ] Wgraj zdjęcia: uzupełnij `galeria` prawdziwymi plikami i tytułami, ustaw `widocznosc.galeria: true`
      oraz `seo.obrazek: "/zdjecia/udostepnianie.jpg"`.
- [ ] Wklej link do filmu w `film.youtube`. Opcjonalnie dodaj podgląd `film.podglad`.
- [ ] `npm run lint`, `npm run build`, obejrzyj stronę przez `npm run preview` w widoku telefonu.
- [ ] Wypchnij zmiany i połącz je z `main`:
      ```bash
      git push origin ulepszenia
      git switch main
      git merge --ff-only ulepszenia
      git push origin main
      ```
- [ ] Cloudflare → **Workers & Pages → Create application** → import repozytorium `washBrand`:
      nazwa `eco-power`, gałąź `main`, budowanie `npm run build`, wdrożenie `npx wrangler deploy`.

### 5. Podpięcie domeny
- [ ] Worker `eco-power` → **Settings → Domains & Routes → Add → Custom Domain** → `ecopoweruniejow.pl`.
- [ ] To samo dla `www.ecopoweruniejow.pl`, a w **Rules** dodaj przekierowanie z `www` na adres bez `www`.
- [ ] Otwórz `https://ecopoweruniejow.pl` i sprawdź, czy kłódka jest prawidłowa.

### 6. Test na telefonie
- [ ] Przejdź kalkulator: kostka w m², panele w sztukach, przycisk „Przekaż do wyceny”, przycisk WhatsApp.
- [ ] Wyślij formularz prawdziwym numerem i sprawdź, czy strona pokazuje podziękowanie.
- [ ] Sprawdź skrzynkę o2.pl **i spam**. Jeśli mail jest w spamie: oznacz „to nie spam” i dodaj nadawcę do kontaktów.
- [ ] W źródle maila sprawdź, czy SPF i DKIM mają wynik `pass`.
- [ ] Wyślij 2–3 kolejne zgłoszenia w różnych porach i sprawdź, czy wszystkie dochodzą.
- [ ] Worker → logi: nie ma błędów `1102` ani `Formularz: wysyłka nieudana`.
- [ ] Sprawdź `/produkty` i `/wspolpraca` (mają dać 404), `/robots.txt`, `/sitemap.xml` i politykę prywatności.
- [ ] Odtwórz film i podziel się linkiem na Messengerze, żeby zobaczyć podgląd.

Panel Email Routing pokazuje wysłane maile jako „dropped” nawet po dostarczeniu, więc o wyniku decyduje skrzynka.
Strona pokazuje telefon tylko wtedy, gdy Cloudflare odrzuci mail. Nie wie o mailu odrzuconym później przez o2.pl.
Jeśli maile nie dochodzą, przejdź do planu awaryjnego poniżej.

#### Plan awaryjny: maile w spamie lub niedochodzące

Dopóki sprawa nie jest rozwiązana, klient widzi podziękowanie, a zgłoszenie może zginąć. Na ten czas zmień opis
formularza w `content.js` tak, by zachęcał do telefonu, i sprawdzaj spam codziennie.

**Co sprawdzić, po kolei:**
- [ ] **Logi Workera:** czy jest `Formularz: wysyłka nieudana (kod)`. Kod `E_SENDER_NOT_VERIFIED` lub
      `E_SENDER_DOMAIN_NOT_AVAILABLE` oznacza problem z domeną nadawcy, `E_RECIPIENT_NOT_ALLOWED` z adresem odbiorcy.
      Pełna lista kodów jest w dokumentacji Cloudflare Email Service.
- [ ] **Email Routing:** status domeny to **Enabled**, a `arti19-89@o2.pl` ma status zweryfikowanego.
- [ ] **Nagłówki maila** (o2.pl → wiadomość → pokaż źródło), linia `Authentication-Results`:
      - `spf=pass`: serwer miał prawo wysłać mail,
      - `dkim=pass` z `d=ecopoweruniejow.pl`: podpis pasuje do naszej domeny,
      - `dmarc=pass`: SPF lub DKIM zgadza się z domeną w polu „Od”.
- [ ] **DNS w Cloudflare** (domena → DNS → Records):
      - MX na `route1/2/3.mx.cloudflare.net`,
      - TXT `@`: `v=spf1 include:_spf.mx.cloudflare.net ~all`,
      - TXT `cf2024-1._domainkey` (DKIM).
      Brakujące rekordy dodaje przycisk naprawy w ustawieniach Email Routing. Na domenie ma być tylko jeden rekord SPF.
- [ ] **DMARC:** jeśli go nie ma, dodaj TXT `_dmarc` o treści `v=DMARC1; p=none`. Tryb `none` tylko obserwuje
      i niczego nie blokuje. Ostrzejszy `quarantine` lub `reject` włączaj dopiero, gdy SPF i DKIM mają wynik `pass`.
- [ ] **Skrzynka o2.pl:** dodaj `formularz@ecopoweruniejow.pl` do kontaktów, oznacz maile „to nie spam”,
      a jeśli panel o2.pl na to pozwala, ustaw regułę przenoszącą je do odebranych.
- [ ] **Test z innej skrzynki:** dodaj w Email Routing zweryfikowany adres Gmail i wyślij na niego próbny mail.
      Jeśli w Gmailu nagłówki są poprawne, a w o2.pl mail nie dochodzi, problem leży po stronie o2.pl.

**Opcje zapasowe, od najprostszej (żadnej nie wdrażamy teraz):**
1. **Inna skrzynka odbiorcza:** zgłoszenia na zweryfikowany adres Gmail, a publiczny adres na stronie bez zmian.
   Darmowe. Wymaga osobnego pola z adresem odbiorcy i Gmaila sprawdzanego przez wujka.
2. **Dwóch odbiorców:** to samo, ale kopia idzie też na o2.pl. Darmowe, chroni przed awarią jednej skrzynki.
3. **Resend z własną domeną:** powrót do poprzedniego rozwiązania, wymaga konta, klucza i rekordów DNS.
   Przed wyborem sprawdź aktualne limity darmowego planu.
4. **Cloudflare Email Sending:** pełna wysyłka z domeną nadawczą. Wymaga płatnego planu Workers
   i mieści się w budżecie, ale to usługa w wersji beta. Przed wyborem sprawdź aktualną cenę.
5. **Zapis zgłoszeń po stronie Cloudflare** jako kopia bezpieczeństwa: trzeba dopisać to do polityki prywatności
   i ustalić usuwanie po 2 miesiącach, więc to opcja ostatnia.

### 7. Google Search Console (darmowe, to nie Profil Firmy)
- [ ] Wejdź na [search.google.com/search-console](https://search.google.com/search-console) i zaloguj się kontem Google.
- [ ] Wybierz typ **Domena** i wpisz `ecopoweruniejow.pl`.
- [ ] Skopiuj rekord TXT od Google i dodaj go w Cloudflare → DNS (typ TXT, nazwa `@`). Kliknij **Zweryfikuj**.
- [ ] **Mapy witryn** → dodaj `https://ecopoweruniejow.pl/sitemap.xml`.
- [ ] **Sprawdzanie adresu URL** → adres strony głównej → **Poproś o zindeksowanie**.
- [ ] Po kilku dniach zajrzyj do **Strony** i **Skuteczność**. Indeksacja bywa kwestią dni lub tygodni.
