// Zmniejsza zdjęcia do strony. Użycie:
//   1. wrzuć oryginały do folderu zdjecia-surowe/ (nie trafia do repozytorium),
//   2. uruchom: npm run zdjecia,
//   3. gotowe pliki .jpg są w public/zdjecia/, bez danych GPS i informacji o aparacie.
// Plik o nazwie zaczynającej się od „udostepnianie" jest kadrowany do 1200×630 (podgląd linku).
// Używa biblioteki sharp, którą instaluje już Next.js.
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const WEJSCIE = 'zdjecia-surowe';
const WYJSCIE = path.join('public', 'zdjecia');
const MAKS_BOK = 1600;
const JAKOSC = 80;
const ROZSZERZENIA = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

// „Podjazd Łódź PRZED.JPG" → „podjazd-lodz-przed"
const naNazwe = (plik) =>
    path.parse(plik).name
        .replace(/ł/g, 'l')
        .replace(/Ł/g, 'L')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const kb = (bajty) => `${Math.round(bajty / 1024)} KB`;

async function przetworz(plik) {
    const nazwa = naNazwe(plik);
    const cel = path.join(WYJSCIE, `${nazwa}.jpg`);
    const zrodlo = path.join(WEJSCIE, plik);
    const rozmiar = nazwa.startsWith('udostepnianie')
        ? { width: 1200, height: 630, fit: 'cover' }
        : { width: MAKS_BOK, height: MAKS_BOK, fit: 'inside', withoutEnlargement: true };

    // rotate() obraca zdjęcie według zapisu z telefonu; metadane nie są kopiowane
    const wynik = await sharp(zrodlo)
        .rotate()
        .resize(rozmiar)
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: JAKOSC, mozjpeg: true })
        .toFile(cel);

    const przed = (await stat(zrodlo)).size;
    console.log(`OK  ${plik} → ${cel} (${wynik.width}×${wynik.height}, ${kb(przed)} → ${kb(wynik.size)})`);
}

const pliki = await readdir(WEJSCIE).catch(() => null);
if (!pliki) {
    console.error(`Brak folderu ${WEJSCIE}/. Utwórz go i wrzuć do niego zdjęcia.`);
    process.exit(1);
}

await mkdir(WYJSCIE, { recursive: true });

const zdjecia = pliki.filter((plik) => ROZSZERZENIA.has(path.extname(plik).toLowerCase()));
const nazwy = new Set();
let bledy = 0;

for (const plik of pliki) {
    if (!zdjecia.includes(plik) && !plik.startsWith('.')) {
        console.error(`POMINIĘTO ${plik}: nieobsługiwany format (np. HEIC z iPhone'a), poproś o JPG.`);
        bledy += 1;
    }
}

for (const plik of zdjecia) {
    const nazwa = naNazwe(plik);
    if (nazwy.has(nazwa)) {
        console.error(`POMINIĘTO ${plik}: taka sama nazwa jak inny plik (${nazwa}.jpg). Zmień nazwę.`);
        bledy += 1;
        continue;
    }
    nazwy.add(nazwa);
    try {
        await przetworz(plik);
    } catch (blad) {
        console.error(`BŁĄD ${plik}: ${blad.message}`);
        bledy += 1;
    }
}

console.log(`Koniec. Zdjęć w folderze: ${zdjecia.length}, problemów: ${bledy}.`);
process.exitCode = bledy ? 1 : 0;
