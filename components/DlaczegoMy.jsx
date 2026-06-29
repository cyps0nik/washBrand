import { dlaczegoMy } from '../data/content';

export default function DlaczegoMy() {
    return (
        <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Dlaczego warto nas wybrać?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dlaczegoMy.map((cecha) => (
                        <div key={cecha.id} className="text-center">
                            <div className="text-5xl mb-4">{cecha.ikona}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{cecha.tytul}</h3>
                            <p className="text-gray-600">{cecha.opis}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}