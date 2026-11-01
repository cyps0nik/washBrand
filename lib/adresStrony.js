import { firma } from '../data/content';

// Pełny adres strony (bez ukośnika na końcu) – do metadataBase, sitemap, robots i JSON-LD.
// Bez adresu w content.js (firma.adresStrony) używamy lokalnego serwera.
export const adresStrony = (firma.adresStrony || 'http://localhost:3000').replace(/\/+$/, '');
