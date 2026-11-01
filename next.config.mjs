/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strona budowana do statycznych plików w folderze out/ (hosting: Cloudflare Workers Static Assets).
  // Formularz wyceny obsługuje worker/index.js.
  output: 'export',
  // Przy eksporcie nie ma serwera do zmniejszania zdjęć, więc wrzucaj już zmniejszone pliki.
  images: { unoptimized: true },
};

export default nextConfig;
