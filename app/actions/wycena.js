"use server";

import { Resend } from 'resend';
import { firma } from '../../data/content';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function wyslijWycene(prevState, formData) {
    const imie = formData.get('imie')?.trim();
    const telefon = formData.get('telefon')?.trim();
    const miejscowosc = formData.get('miejscowosc')?.trim();
    const metraz = formData.get('metraz')?.trim();
    const opis = formData.get('opis')?.trim();

    if (!imie || !telefon) {
        return { success: false, error: "Imię oraz numer telefonu są wymagane." };
    }

    try {
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Eco-Power Leads <onboarding@resend.dev>',
                to: firma.email,
                subject: `Nowy lead: ${imie} (${miejscowosc || 'Brak miasta'})`,
                html: `
                    <h2>Nowe zapytanie o wycenę</h2>
                    <p><strong>Klient:</strong> ${imie}</p>
                    <p><strong>Telefon:</strong> <a href="tel:${telefon}">${telefon}</a></p>
                    <p><strong>Miejscowość:</strong> ${miejscowosc || 'Nie podano'}</p>
                    <p><strong>Szacowany metraż:</strong> ${metraz || 'Brak'}</p>
                    <p><strong>Opis:</strong> ${opis || 'Brak uwag'}</p>
                `
            });
        } else {
            console.log("LEAD (brak RESEND_API_KEY):", { imie, telefon, miejscowosc, metraz, opis });
        }
        return { success: true, error: null };
    } catch (err) {
        console.error(err);
        return { success: false, error: "Błąd wysyłki. Skontaktuj się bezpośrednio pod numerem telefonu." };
    }
}