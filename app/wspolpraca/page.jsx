import { zaufaliNam, firma } from '../../data/content';

// Ustawiamy tytuł karty w przeglądarce dla lepszego SEO
export const metadata = {
    title: `Zaufali nam | ${firma.nazwa}`,
    description: 'Lista firm, instytucji i wspólnot, z którymi współpracowaliśmy.',
};

export default function WspolpracaPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Nagłówek podstrony */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Zaufali nam</h1>
                    <p className="text-xl text-gray-600">
                        Mieliśmy przyjemność współpracować z wieloma firmami, instytucjami oraz wspólnotami. Oto niektóre z nich.
                    </p>
                </div>

                {/* Lista firm wyciągana z pliku content.js */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    {(!zaufaliNam || zaufaliNam.length === 0) ? (
                        <p className="text-center text-gray-500">Lista współpracujących firm jest obecnie aktualizowana.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {zaufaliNam.map((klient) => (
                                <div
                                    key={klient.id}
                                    className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                                >
                                    <span className="text-2xl mr-4">🤝</span>
                                    <span className="font-medium text-gray-800">{klient.nazwa}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}