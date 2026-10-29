"use server";

import { Resend } from 'resend';
import { firma, formularz } from '../../data/content';

// Zamienia znaki specjalne HTML, żeby tekst od klienta nie wstawił do maila linków ani kodu
const escapeHtml = (tekst) =>
    String(tekst).replace(/[&<>"']/g, (znak) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[znak]);

export async function wyslijWycene(prevState, formData) {
    // Pułapka na boty: ukryte pole, którego człowiek nie widzi. Jeśli jest wypełnione,
    // udajemy sukces i nic nie wysyłamy.
    if (formData.get('strona_www')) {
        return { success: true, error: null };
    }

    const imie = formData.get('imie')?.trim();
    const telefon = formData.get('telefon')?.trim();
    const miejscowosc = formData.get('miejscowosc')?.trim();
    const metraz = formData.get('metraz')?.trim();
    const opis = formData.get('opis')?.trim();

    // Przy błędzie odsyłamy wpisane dane, żeby formularz ich nie wyczyścił
    const wartosci = { imie, telefon, miejscowosc, metraz, opis };

    if (!telefon) {
        return { success: false, error: formularz.bladBrakDanych, wartosci };
    }
    // Polski numer to 9 cyfr (z kierunkowym więcej); mniej oznacza literówkę
    if (telefon.replace(/\D/g, '').length < 9) {
        return { success: false, error: formularz.bladTelefon, wartosci };
    }

    try {
        if (process.env.RESEND_API_KEY) {
            // Klient tworzony dopiero tutaj: bez klucza konstruktor Resend rzuca wyjątek
            const resend = new Resend(process.env.RESEND_API_KEY);
            const { error } = await resend.emails.send({
                // Po weryfikacji domeny w Resend ustaw RESEND_FROM, np. "Eco-Power <wycena@twoja-domena.pl>"
                from: process.env.RESEND_FROM || 'Eco-Power Leads <onboarding@resend.dev>',
                to: firma.email,
                subject: `Nowy lead: ${imie || telefon} (${miejscowosc || 'Brak miasta'})`,
                html: `
                    <h2>Nowe zapytanie o wycenę</h2>
                    <p><strong>Klient:</strong> ${escapeHtml(imie || 'Nie podano')}</p>
                    <p><strong>Telefon:</strong> <a href="tel:${escapeHtml(telefon.replace(/\s/g, ''))}">${escapeHtml(telefon)}</a></p>
                    <p><strong>Miejscowość:</strong> ${escapeHtml(miejscowosc || 'Nie podano')}</p>
                    <p><strong>Szacowany metraż:</strong> ${escapeHtml(metraz || 'Brak')}</p>
                    <p><strong>Opis:</strong> ${escapeHtml(opis || 'Brak uwag')}</p>
                `
            });
            if (error) throw error;
        } else {
            console.log("LEAD (brak RESEND_API_KEY):", { imie, telefon, miejscowosc, metraz, opis });
        }
        return { success: true, error: null };
    } catch (err) {
        console.error(err);
        return { success: false, error: formularz.bladWysylki, wartosci };
    }
}
