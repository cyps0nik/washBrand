import Hero from '../components/Hero';
import Uslugi from '../components/Uslugi';
import KalkulatorWyceny from '../components/KalkulatorWyceny';
import DlaczegoMy from '../components/DlaczegoMy';
import Galeria from '../components/Galeria';
//import Opinie from '../components/Opinie';
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
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": firma.miasto,
        "addressLocality": firma.miejscowosc,
        "postalCode": "99-210",
        "addressCountry": "PL"
    }
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero />
            <Uslugi />
            <KalkulatorWyceny />
            <DlaczegoMy />
            <Galeria />
            {/*<Opinie />*/}
            <FAQ />
            <FormularzWyceny />
            <Kontakt />
        </>
    );
}