import Hero from '../components/Hero';
import Uslugi from '../components/Uslugi';
import DlaczegoMy from '../components/DlaczegoMy';
import Galeria from '../components/Galeria';
import FAQ from '../components/FAQ';
import Kontakt from '../components/Kontakt';

export default function Home() {
    return (
        <>
            <Hero />
            <Uslugi />
            <DlaczegoMy />
            <Galeria />
            <FAQ />
            <Kontakt />
        </>
    );
}