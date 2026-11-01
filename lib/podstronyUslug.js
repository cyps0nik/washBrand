import { uslugi, widocznosc } from '../data/content.js';

// Podstrona usługi powstaje, gdy jest włączona w `widocznosc` i ma wpisany wstęp.
// Dzięki temu włącznik bez treści nie opublikuje pustej strony.
export const uslugiZPodstrona = uslugi.filter(
    (usluga) => widocznosc.podstronyUslug[usluga.id] && usluga.podstrona.wstep
);

export const adresPodstrony = (usluga) => `/uslugi/${usluga.podstrona.adres}`;
