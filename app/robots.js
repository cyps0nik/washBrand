import { adresStrony } from '../lib/adresStrony';

export const dynamic = 'force-static';

// Ukrytych podstron nie blokujemy tutaj: Google musi je odwiedzić, żeby zobaczyć „noindex".
export default function robots() {
    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: `${adresStrony}/sitemap.xml`,
    };
}
