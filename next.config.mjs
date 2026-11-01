import { widocznosc } from './data/content.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strona budowana do statycznych plików w folderze out/ (hosting: Cloudflare Workers Static Assets).
  // Formularz wyceny obsługuje worker/index.js.
  output: 'export',
  // Przy eksporcie nie ma serwera do zmniejszania zdjęć, więc wrzucaj już zmniejszone pliki.
  images: { unoptimized: true },
  // Podstrony z własnym rozszerzeniem (np. page.produkty.jsx) powstają tylko, gdy są włączone
  // w `widocznosc` w content.js. Wyłączone dają prawdziwe 404, a ich dane nie trafiają do builda.
  pageExtensions: [
    'jsx',
    'js',
    ...['produkty', 'wspolpraca'].filter((nazwa) => widocznosc[nazwa]).map((nazwa) => `${nazwa}.jsx`),
  ],
};

export default nextConfig;
