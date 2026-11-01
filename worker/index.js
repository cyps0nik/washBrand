import { firma, formularz } from '../data/content.js';
import { limityFormularza } from '../lib/limityFormularza.js';

// Worker Cloudflare obsługuje tylko formularz wyceny (POST /api/wycena).
// Zmienne: RESEND_API_KEY (Secret), opcjonalnie RESEND_FROM.

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

// Prawdziwe zgłoszenie mieści się w tym rozmiarze (bajty)
const MAKS_ROZMIAR = 16 * 1024;

// Boty mogą przysłać cokolwiek, więc liczą się tylko teksty
const tekst = (wartosc) => (typeof wartosc === 'string' ? wartosc.trim() : '');

// Pola jednowierszowe: bez znaków nowej linii (trafiają m.in. do tematu maila)
const wiersz = (wartosc) => tekst(wartosc).replace(/\s+/g, ' ');

async function wyslijMail(env, { imie, telefon, miejscowosc, metraz, opis }) {
    const wynik = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // Po weryfikacji domeny w Resend ustaw RESEND_FROM, np. "Eco-Power <wycena@twoja-domena.pl>"
            from: env.RESEND_FROM || 'Eco-Power Leads <onboarding@resend.dev>',
            to: firma.email,
            subject: `Nowy lead: ${imie || telefon} (${miejscowosc || 'Brak miasta'})`,
            html: `
                <h2>Nowe zapytanie o wycenę</h2>
                <p><strong>Klient:</strong> ${escapeHtml(imie || 'Nie podano')}</p>
                <p><strong>Telefon:</strong> <a href="tel:${escapeHtml(telefon.replace(/\s/g, ''))}">${escapeHtml(telefon)}</a></p>
                <p><strong>Miejscowość:</strong> ${escapeHtml(miejscowosc || 'Nie podano')}</p>
                <p><strong>Szacowany metraż:</strong> ${escapeHtml(metraz || 'Brak')}</p>
                <p><strong>Opis:</strong> ${escapeHtml(opis || 'Brak uwag')}</p>
            `,
        }),
    });
    if (!wynik.ok) throw new Error(`Resend: status ${wynik.status}`);
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
        return odpowiedz({ success: false, error: formularz.bladWysylki }, 400);
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
        return odpowiedz({ success: false, error: formularz.bladBrakDanych }, 400);
    }
    if (Object.entries(limityFormularza).some(([nazwa, limit]) => pola[nazwa].length > limit)) {
        return odpowiedz({ success: false, error: formularz.bladZaDlugie }, 400);
    }
    // Polski numer to 9 cyfr, z kierunkowym więcej (najwięcej 15 w numeracji międzynarodowej)
    const cyfry = telefon.replace(/\D/g, '').length;
    if (!/^[+\d\s()./-]+$/.test(telefon) || cyfry < 9 || cyfry > 15) {
        return odpowiedz({ success: false, error: formularz.bladTelefon }, 400);
    }

    try {
        if (env.RESEND_API_KEY) {
            await wyslijMail(env, { imie, telefon, miejscowosc, metraz, opis });
        } else {
            console.log('LEAD (brak RESEND_API_KEY):', { imie, telefon, miejscowosc, metraz, opis });
        }
        return odpowiedz({ success: true, error: null });
    } catch (err) {
        console.error(err);
        return odpowiedz({ success: false, error: formularz.bladWysylki }, 502);
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
