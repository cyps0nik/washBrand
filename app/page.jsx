import Hero from '../components/Hero';
import Uslugi from '../components/Uslugi';
import KalkulatorWyceny from '../components/KalkulatorWyceny';
import DlaczegoMy from '../components/DlaczegoMy';
import Film from '../components/Film';
import Galeria from '../components/Galeria';
import Opinie from '../components/Opinie';
import FAQ from '../components/FAQ';
import FormularzWyceny from '../components/FormularzWyceny';
import Kontakt from '../components/Kontakt';
import { firma, uslugi, seo } from '../data/content';
import { adresStrony } from '../lib/adresStrony';

export const metadata = {
    alternates: { canonical: '/' },
};

// Dane firmy dla Google (LocalBusiness) – wszystko z content.js
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": firma.nazwa,
    "description": seo.opis,
    "url": adresStrony,
    "image": `${adresStrony}${seo.obrazek}`,
    "telephone": firma.telefon,
    "email": firma.email,
    "vatID": firma.nip,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": firma.ulica,
        "addressLocality": firma.miejscowosc,
        "postalCode": firma.kodPocztowy,
        "addressCountry": "PL"
    },
    "areaServed": firma.obszar.map((miejscowosc) => ({ "@type": "City", "name": miejscowosc })),
    "sameAs": [firma.facebook, firma.instagram].filter(Boolean),
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Usługi",
        "itemListElement": uslugi.map((usluga) => ({
            "@type": "Offer",
            "description": usluga.cena,
            "itemOffered": { "@type": "Service", "name": usluga.nazwa, "description": usluga.opis }
        }))
    }
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
            <Hero />
            <Uslugi />
            <KalkulatorWyceny />
            <FormularzWyceny />
            <DlaczegoMy />
            <Film />
            <Galeria />
            <Opinie />
            <FAQ />
            <Kontakt />
        </>
    );
}