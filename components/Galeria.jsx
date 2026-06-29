import { galeria } from '../data/content';

export default function Galeria() {
    return (
        <section id="galeria" className="py-16 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Nasze realizacje</h2>
                <p className="text-center text-gray-600 mb-12">Zobacz efekty naszej pracy przed i po czyszczeniu.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {galeria.map((zdjecie) => (
                        <div key={zdjecie.id} className="overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                            {/* Używamy zwykłego taga <img> dla uproszczenia edycji dla początkujących */}
                            <img
                                src={zdjecie.url}
                                alt={zdjecie.alt}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}