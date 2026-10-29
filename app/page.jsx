import Hero from '../components/Hero';
import Uslugi from '../components/Uslugi';
import KalkulatorWyceny from '../components/KalkulatorWyceny';
import DlaczegoMy from '../components/DlaczegoMy';
import Galeria from '../components/Galeria';
import Opinie from '../components/Opinie';
import FAQ from '../components/FAQ';
import FormularzWyceny from '../components/FormularzWyceny';
import Kontakt from '../components/Kontakt';
import { firma } from '../data/content';

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": firma.nazwa,
    "telephone": firma.telefon,
    "email": firma.email,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": firma.ulica,
        "addressLocality": firma.miejscowosc,
        "postalCode": firma.kodPocztowy,
        "addressCountry": "PL"
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
            <Galeria />
            <Opinie />
            <FAQ />
            <Kontakt />
        </>
    );
}