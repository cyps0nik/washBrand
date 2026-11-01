import { widocznosc } from '../data/content';
import { adresStrony } from '../lib/adresStrony';

export const dynamic = 'force-static';

// Mapa strony dla Google. /produkty i /wspolpraca pojawiają się tylko, gdy są włączone w `widocznosc`.
export default function sitemap() {
    return [
        { url: adresStrony, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        ...['produkty', 'wspolpraca'].filter((nazwa) => widocznosc[nazwa]).map((nazwa) => (
            { url: `${adresStrony}/${nazwa}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 }
        )),
        { url: `${adresStrony}/polityka-prywatnosci`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];
}
