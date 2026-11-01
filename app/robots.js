import { adresStrony } from '../lib/adresStrony';

export const dynamic = 'force-static';

// Podstrony wyłączone w `widocznosc` w content.js zwracają 404, więc nie trzeba ich tu blokować.
export default function robots() {
    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: `${adresStrony}/sitemap.xml`,
    };
}
