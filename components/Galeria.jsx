import { galeria } from '../data/content';

export default function Galeria() {
    return (
        <section id="galeria" className="py-16 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Nasze realizacje</h2>
                <p className="text-center text-gray-600 mb-12">Najlepszym dowodem naszej skuteczności są efekty. Zobacz różnicę.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {galeria.map((projekt) => (
                        <div key={projekt.id} className="bg-slate-50 p-4 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{projekt.tytul}</h3>

                            <div className="flex flex-col sm:flex-row gap-2">
                                {/* Zdjęcie PRZED */}
                                <div className="flex-1 relative rounded-xl overflow-hidden shadow-inner border border-slate-200">
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md z-10 shadow-md">
                    PRZED
                  </span>
                                    <img
                                        src={projekt.zdjeciePrzed}
                                        alt={`Przed: ${projekt.tytul}`}
                                        className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Zdjęcie PO */}
                                <div className="flex-1 relative rounded-xl overflow-hidden shadow-inner border border-slate-200">
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-black px-3 py-1 rounded-md z-10 shadow-md">
                    PO
                  </span>
                                    <img
                                        src={projekt.zdjeciePo}
                                        alt={`Po: ${projekt.tytul}`}
                                        className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}