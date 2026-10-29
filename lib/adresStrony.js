import { firma } from '../data/content';

// Pełny adres strony (bez ukośnika na końcu) – do metadataBase, sitemap, robots i JSON-LD.
// Kolejność: adres wpisany w content.js → produkcyjny adres z Vercela → lokalny serwer.
const zVercela = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null;

export const adresStrony = (firma.adresStrony || zVercela || 'http://localhost:3000').replace(/\/+$/, '');
