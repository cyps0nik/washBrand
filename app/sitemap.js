import { adresStrony } from '../lib/adresStrony';

// Mapa strony dla Google. Podstron /produkty i /wspolpraca celowo tu nie ma (dane przykładowe).
export default function sitemap() {
    return [
        { url: adresStrony, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        { url: `${adresStrony}/polityka-prywatnosci`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];
}
