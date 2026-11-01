import { widocznosc } from '../data/content';
import { adresStrony } from '../lib/adresStrony';
import { adresPodstrony, uslugiZPodstrona } from '../lib/podstronyUslug';

export const dynamic = 'force-static';

// Mapa strony dla Google. /produkty, /wspolpraca i podstrony usług pojawiają się tylko po włączeniu w `widocznosc`.
export default function sitemap() {
    return [
        { url: adresStrony, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        ...['produkty', 'wspolpraca'].filter((nazwa) => widocznosc[nazwa]).map((nazwa) => (
            { url: `${adresStrony}/${nazwa}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 }
        )),
        ...uslugiZPodstrona.map((usluga) => (
            { url: `${adresStrony}${adresPodstrony(usluga)}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }
        )),
        { url: `${adresStrony}/polityka-prywatnosci`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];
}
