import { faq } from '../data/content';

export default function FAQ() {
    return (
        <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Często zadawane pytania</h2>
                <div className="space-y-4">
                    {faq.map((element) => (
                        <details key={element.id} className="group bg-white rounded-lg shadow-sm border border-slate-200">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900">
                                <span>{element.pytanie}</span>
                                <span className="transition-transform group-open:rotate-180">
                  {/* Prosta ikonka strzałki w dół budowana z użyciem SVG */}
                                    <svg fill="none" height="24" width="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                {element.odpowiedz}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}