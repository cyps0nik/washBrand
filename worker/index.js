import { firma, formularz } from '../data/content.js';
import { limityFormularza } from '../lib/limityFormularza.js';

// Worker Cloudflare obsługuje tylko formularz wyceny (POST /api/wycena).
// Mail wychodzi przez wiązanie EMAIL (Cloudflare Email Routing, patrz wrangler.jsonc). Odbiorca musi być
// zweryfikowanym adresem docelowym na koncie Cloudflare, a domena nadawcy mieć włączony Email Routing.
// Do logów nie trafiają dane klienta, tylko informacja techniczna.

// Zamienia znaki specjalne HTML, żeby tekst od klienta nie wstawił do maila linków ani kodu
const escapeHtml = (tekst) =>
    String(tekst).replace(/[&<>"']/g, (znak) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[znak]);

const odpowiedz = (dane, status = 200) => Response.json(dane, { status });

// Formularza nie da się wypełnić szybciej (milisekundy od jego wczytania); tak robią boty
const MIN_CZAS_MS = 3000;

// Prawdziwe zgłoszenie mieści się w tym rozmiarze (bajty)
const MAKS_ROZMIAR = 16 * 1024;

// Boty mogą przysłać cokolwiek, więc liczą się tylko teksty
const tekst = (wartosc) => (typeof wartosc === 'string' ? wartosc.trim() : '');

// Pola jednowierszowe: bez znaków nowej linii (trafiają m.in. do tematu maila)
const wiersz = (wartosc) => tekst(wartosc).replace(/\s+/g, ' ');

// Adres nadawcy musi być w domenie z włączonym Email Routing. Nie musi istnieć jako skrzynka.
const NADAWCA = { name: 'Eco-Power – formularz', email: 'formularz@ecopoweruniejow.pl' };

async function wyslijMail(env, { imie, telefon, miejscowosc, metraz, opis }) {
    await env.EMAIL.send({
        from: NADAWCA,
        to: firma.email,
        subject: `Nowy lead: ${imie || telefon} (${miejscowosc || 'Brak miasta'})`,
        text: [
            'Nowe zapytanie o wycenę',
            `Klient: ${imie || 'Nie podano'}`,
            `Telefon: ${telefon}`,
            `Miejscowość: ${miejscowosc || 'Nie podano'}`,
            `Metraż lub liczba paneli: ${metraz || 'Brak'}`,
            `Opis: ${opis || 'Brak uwag'}`,
        ].join('\n'),
        html: `
            <h2>Nowe zapytanie o wycenę</h2>
            <p><strong>Klient:</strong> ${escapeHtml(imie || 'Nie podano')}</p>
            <p><strong>Telefon:</strong> <a href="tel:${escapeHtml(telefon.replace(/\s/g, ''))}">${escapeHtml(telefon)}</a></p>
            <p><strong>Miejscowość:</strong> ${escapeHtml(miejscowosc || 'Nie podano')}</p>
            <p><strong>Metraż lub liczba paneli:</strong> ${escapeHtml(metraz || 'Brak')}</p>
            <p><strong>Opis:</strong> ${escapeHtml(opis || 'Brak uwag')}</p>
        `,
    });
}

async function obsluzWycene(request, env) {
    if (Number(request.headers.get('content-length')) > MAKS_ROZMIAR) {
        return odpowiedz({ success: false, error: formularz.bladZaDlugie }, 413);
    }

    let dane;
    try {
        dane = await request.json();
    } catch {
        dane = null;
    }
    if (!dane || typeof dane !== 'object') {
        return odpowiedz({ success: false, error: formularz.bladWysylki, zadzwon: true }, 400);
    }

    // Pułapka na boty: ukryte pole, którego człowiek nie widzi. Jeśli jest wypełnione,
    // udajemy sukces i nic nie wysyłamy.
    if (dane.strona_www) return odpowiedz({ success: true, error: null });

    const pola = {
        imie: wiersz(dane.imie),
        telefon: wiersz(dane.telefon),
        miejscowosc: wiersz(dane.miejscowosc),
        metraz: wiersz(dane.metraz),
        opis: tekst(dane.opis),
    };
    const { imie, telefon, miejscowosc, metraz, opis } = pola;

    if (!telefon) {
        return odpowiedz({ success: false, error: formularz.bladBrakDanych, pole: 'telefon' }, 400);
    }
    if (Object.entries(limityFormularza).some(([nazwa, limit]) => pola[nazwa].length > limit)) {
        return odpowiedz({ success: false, error: formularz.bladZaDlugie }, 400);
    }
    // Polski numer to 9 cyfr, z kierunkowym więcej (najwięcej 15 w numeracji międzynarodowej)
    const cyfry = telefon.replace(/\D/g, '').length;
    if (!/^[+\d\s()./-]+$/.test(telefon) || cyfry < 9 || cyfry > 15) {
        return odpowiedz({ success: false, error: formularz.bladTelefon, pole: 'telefon' }, 400);
    }

    // Człowieka też może to spotkać (np. autouzupełnianie), więc zamiast udawać sukces prosimy o ponowne wysłanie
    if (!(Number(dane.czas_ms) >= MIN_CZAS_MS)) {
        return odpowiedz({ success: false, error: formularz.bladZaSzybko }, 400);
    }

    // Bez wiązania nic by nie dotarło do firmy, więc nie udajemy sukcesu, tylko prosimy o telefon
    if (!env.EMAIL) {
        console.error('Formularz: brak wiązania EMAIL');
        return odpowiedz({ success: false, error: formularz.bladNiedostepny, zadzwon: true }, 503);
    }

    try {
        await wyslijMail(env, pola);
        return odpowiedz({ success: true, error: null });
    } catch (err) {
        // Sam kod błędu: treść wyjątku mogłaby zawierać adresy
        console.error(`Formularz: wysyłka nieudana (${err.code || 'bez kodu'}). Sprawdź Email Routing i zweryfikowany adres odbiorcy.`);
        return odpowiedz({ success: false, error: formularz.bladWysylki, zadzwon: true }, 502);
    }
}

const worker = {
    async fetch(request, env) {
        const { pathname } = new URL(request.url);
        if (pathname === '/api/wycena') {
            if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
            return obsluzWycene(request, env);
        }
        // Pozostałe adresy /api/* nie istnieją: zwracamy stronę 404
        return env.ASSETS.fetch(request);
    },
};

export default worker;
